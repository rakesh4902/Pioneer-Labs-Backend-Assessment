const express = require("express");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());

// Example users database (for demonstration purposes)
const users = [
    {
        username: 'rakesh',
        password: 'rakesh123'
    },
    {
        username: 'user2',
        password: 'password2'
    }
];

// Secret key for JWT
const secretKey = "user-tasks";

// Middleware to verify JWT authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Unauthorized: No JWT token provided" });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden: Invalid JWT token" });
        req.user = user;
        next();
    });
}

// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Authentication API",
        version: "1.0.0",
        description: "API endpoints for user authentication",
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
    servers: [
        {
            url: "http://localhost:3000", // Keep your working port number
            description: "Development server",
        },
    ],
};

// Options for the swagger jsdoc
const options = {
    swaggerDefinition,
    apis: ["./app.js"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Retrieve data for authenticated users
 *     description: Get some data for authenticated users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful retrieval of data
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: Username of the authenticated user
 */

app.get("/api/data", authenticateToken, (req, res) => {
    // Return some data for authenticated users
    res.json({ message: "Authenticated user data", user: req.user });
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
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *       '401':
 *         description: Unauthorized, invalid username or password
 */

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) return res.status(401).json({ error: "Unauthorized: Invalid username or password" });

    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ token });
});

// Error handling middleware for unauthenticated requests
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
