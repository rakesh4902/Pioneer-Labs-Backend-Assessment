const express = require('express');
const { Web3 } = require('web3');
const { isValidAddress } = require('ethereumjs-util');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Initialize web3 with the provider
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/dc59b543a8d64254a38af97b1b0cb4c6');
const web3 = new Web3(provider);

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ethereum Account Balance API',
      version: '1.0.0',
      description: 'API to retrieve Ethereum account balance',
    },
  },
  apis: ['./app.js'], // Path to the API files
};

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route to retrieve Ethereum account balance
/**
 * @swagger
 * /balance/{address}:
 *   get:
 *     summary: Get Ethereum account balance
 *     description: Retrieve the balance of the specified Ethereum account.
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: Ethereum address to get the balance for.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with Ethereum account balance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                   description: Ethereum address.
 *                 balance:
 *                   type: string
 *                   description: Ethereum account balance in ether.
 *       '400':
 *         description: Invalid Ethereum address.
 *       '500':
 *         description: Internal server error.
 */
app.get('/balance/:address', async (req, res) => {
    const { address } = req.params;

    try {
        // Check if address is a valid Ethereum address
        if (!isValidAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }
        // Retrieve account balance
        const balance = await web3.eth.getBalance(address);

        // Convert balance from wei to ether
        const etherBalance = web3.utils.fromWei(balance, 'ether');

        res.json({ address, balance: etherBalance });
    } catch (error) {
        console.error('Error retrieving account balance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




//  Sample Eth address to check balance :- 
//  0x388C818CA8B9251b393131C08a736A67ccB19297
// 0x848D30F307f02F1Ca92b71Be8BF5B28256F8d9bE
// 0x72d38F294aeDBfbF8F2ae7fb98a4e78079948526
// For more addresses visit this website :- https://ethplorer.io/address/0xd76b5c2a23ef78368d8e34288b5b65d616b746ae#pageTab=transfers


