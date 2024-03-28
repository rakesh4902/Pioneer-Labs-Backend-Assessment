const express = require("express");
const fetch = require("node-fetch");
const swaggerUi = require("swagger-ui-express"); 
const swaggerJSDoc =require("swagger-jsdoc");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

const options={
    definition:{
      openapi:'3.0.0',
      info:{
        title:"User Applying Filters on Public API's",
        version:'1.0.0'
      },
      
      security: {
        bearerAuth: [],
      },
      servers:[
        {
          url:'http://localhost:3000/'
        }
      ]
    },
    apis:['./app.js']
  }
  const swaggerSpec=swaggerJSDoc(options)
  // Swagger UI endpoint
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let publicApis = []; // State to store fetched data

// Function to fetch data from the public API
const fetchData = async () => {
    try {
        const response = await fetch("https://api.publicapis.org/entries");
        if (!response.ok) {
            throw new Error("Failed to fetch data from the public API");
        }
        const data = await response.json();
        return data.entries;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return [];
    }
};

// Initialize the server and fetch data
const initializeServerAndFetchData = async () => {
    try {
        publicApis = await fetchData();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error initializing server:", error.message);
        process.exit(1);
    }
};

initializeServerAndFetchData();

/**
 * @swagger
 * tags:
 *   name: PublicAPIs
 *   description: Endpoints for accessing public APIs
 */

/**
 * @swagger
 * /api/publicapis:
 *   get:
 *     summary: Retrieve public APIs with optional filtering
 *     description: |
 *       This endpoint retrieves public APIs and allows optional filtering based on category and limit.
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Filter APIs by category (case-insensitive)
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Limit the number of results
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: A list of public APIs matching the filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The number of APIs in the response
 *                 entries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       # Add your properties here based on the structure of publicApis
 *       '400':
 *         description: Bad request, typically due to an invalid limit parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error
 */

// API endpoint to fetch data with filtering options
app.get("/api/publicapis", async (req, res) => {
    try {
        const { category, limit } = req.query;

        // Check for invalid limit parameter
        if (limit && isNaN(parseInt(limit))) {
            return res.status(400).json({ error: "Limit parameter must be a number" });
        }

        // Filter data based on category if provided
        let filteredData = publicApis;
        if (category) {
            filteredData = publicApis.filter(api => api.Category.toLowerCase() === category.toLowerCase());
        }

        // Limit the number of results if provided
        if (limit) {
            const limitCount = parseInt(limit);
            filteredData = filteredData.slice(0, limitCount);
        }

        res.json({ count: filteredData.length, entries: filteredData });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Global error handler:", err.message);
    res.status(500).json({ error: "Internal server error" });
});
