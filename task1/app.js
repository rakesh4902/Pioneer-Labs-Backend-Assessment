const express = require("express");
const app = express();
app.use(express.json());
const swaggerUi = require("swagger-ui-express"); 
const swaggerJSDoc =require("swagger-jsdoc");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const dbPath = path.join(__dirname, "users.db");
let db = null;

const options={
  definition:{
    openapi:'3.0.0',
    info:{
      title:"User Authentication APIS's",
      version:'1.0.0'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer Token',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    servers:[
      {
        url:'http://localhost:3001/'
      }
    ]
  },
  apis:['./app.js']
}

const initializeDbAndServer = async () => {
    try {
      // Open SQLite database connection
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
  
      // Start the server
      app.listen(3000, () => {
        console.log("Server is running...");
      });
    } catch (e) {
      console.log(`DB Error: ${e.message}`);
      process.exit(1);
    }
  };
  
  initializeDbAndServer();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided username, email, and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username or email already exists
 *       500:
 *         description: Internal server error
 */
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await db.get(
            "SELECT * FROM users WHERE username = ? OR email = ?",
            [username, email]
        );

        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        await db.run(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in as a user
 *     description: Log in as a user with the provided username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */
app.post("/login", async (request, response) => {
    try {
      const { username, password } = request.body;
  
      // Check if the user exists
      const selectUserQuery = `
        SELECT *
        FROM users
        WHERE username= '${username}';
      `;
      const dbUser = await db.get(selectUserQuery);
  
      if (!dbUser) {
        return response.status(400).send("Invalid user");
      }
  
      // Verify the password
      const isCorrectPassword = await bcrypt.compare(password, dbUser.password);
  
      if (!isCorrectPassword) {
        return response.status(400).send("Invalid password");
      }
  
      // Generate and send JWT token on successful login
      const payload = { username: username };
      const jwtToken = jwt.sign(payload, "user-tasks");
      response.status(200).send({ jwtToken });
    } catch (error) {
      console.error("Error during login:", error);
      response.status(500).send("Internal server error");
    }
  });

  
/**
 * Middleware for authenticating JWT token
 * @param {Request} request - The HTTP request object
 * @param {Response} response - The HTTP response object
 * @param {Function} next - The next middleware function
 */
const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const jwtToken = authHeader && authHeader.split(" ")[1]; // Extract JWT token from the Authorization header

  if (!jwtToken) {
      return response.status(401).json({ error: "Unauthorized: No JWT token provided" });
  }

  jwt.verify(jwtToken, "user-tasks", (error, user) => {
      if (error) {
          return response.status(403).json({ error: "Forbidden: Invalid JWT token" });
      } else {
          // Attach user information to the request for further use in protected routes
          request.user = user;
          next();
      }
  });
};

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Get the profile information of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     
 *     responses:
 *        200:
 *         description: User profile information
 *        401:
 *         description: Unauthorized, No JWT token provided
 *        403:
 *         description: Forbidden, Invalid JWT token
 */



// Example of using the authenticateToken middleware in a protected route
app.get("/profile", authenticateToken, (request, response) => {
  // Access user information from the request object
  const username = request.user.username;
  response.json({ message: `Welcome ${username}! This is a protected route.` });
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out
 *     description: Log out the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized, No JWT token provided
 *       403:
 *         description: Forbidden, Invalid JWT token
 */

app.post("/logout", authenticateToken, (request, response) => {
  const username = request.user.username;
  response.status(200).json({ message: `Thank you ${username}, you have been logged out successfully!` });
});



const swaggerSpec=swaggerJSDoc(options)
// Swagger UI endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });

module.exports = app;

