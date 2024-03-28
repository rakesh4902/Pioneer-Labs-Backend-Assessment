# Pioneer Labs Backend Assessment

This repository contains the backend assessment tasks for Pioneer Labs. Below you will find instructions on how to set up and run each task, along with usage documentation for the provided APIs.

## Setup

1. **Clone the Repository**: Download or clone the repository from [https://github.com/rakesh4902/Pioneer-Labs-Backend-Assessment](https://github.com/rakesh4902/Pioneer-Labs-Backend-Assessment).
   
2. **Navigate to Task Directory**: After extracting the downloaded ZIP file, navigate to the directory of the specific task you want to work on.

3. **Install Dependencies**: Open a terminal in the task directory and run the following command to install the required dependencies:
   
    ```bash
    npm install
    ```

4. **Run the Task**: Once the dependencies are installed, start the server using the following command:

    ```bash
    cd <project-directory>(task1)
    nodemon app.js
    ```

    The server will start running on a specified port, usually port 3000 or 3001.

## Task Documentation

## Task 1: User Authentication APIs

#### Register a New User

- **URL**: `POST http://localhost:{running_port_no(ex:3000 or 3001}/register`
- **Content-Type**: application/json
- **Body**:
  
    ```json
    {
        "username": "your_username",
        "email": "your_email@example.com",
        "password": "your_password"
    }
    ```

    Register a new user with the provided username, email, and password.

#### Login as a User

- **URL**: `POST http://localhost:{running_port_no(ex:3000 or 3001}/login`
- **Content-Type**: application/json
- **Body**:

    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```

    Log in as a user with the provided username and password.

#### Get User Profile

- **URL**: `GET http://localhost:{running_port_no(ex:3000 or 3001}/profile`
- **Authorization**: Bearer Token (JWT obtained after successful login)

    Get the profile information of the authenticated user.

#### Log Out

- **URL**: `POST http://localhost:{running_port_no(ex:3000 or 3001}/logout`
- **Authorization**: Bearer Token (JWT obtained after successful login)

    Log out the authenticated user.


You can access all API requests in the app.http file.

### Swagger Documentation Output for Task 1
![image](https://github.com/rakesh4902/Pioneer-Labs-Backend-Assessment/assets/83058036/23029395-a7e5-431e-a81d-090fb5186245)



# Swagger API Documentation Usage

The Swagger API documentation provides a comprehensive guide to interact with the User Authentication APIs. Follow these steps to effectively use the Swagger documentation:

## Access Swagger UI

1. Open your web browser and navigate to the following URL: http://localhost:{running_port_no}/api-docs/

Replace `{running_port_no}` with the port number where your server is running (e.g., 3000 or 3001). This URL will display the Swagger UI interface containing all available API endpoints and their descriptions.

## Explore Endpoints

1. Explore the list of available endpoints provided in the Swagger UI.
2. Each endpoint is categorized based on its functionality, such as registration, login, profile retrieval, and logout.

## Understanding Endpoints

1. Click on each endpoint to view detailed information, including its summary, description, request body format, and possible responses.
2. Take note of the required parameters for each endpoint, such as username, email, and password for registration.

## Interact with Endpoints

1. To interact with an endpoint, click on the "Try it out" button next to the endpoint description.
2. Fill in the required parameters in the request body as specified in the Swagger documentation.
3. After filling in the parameters, click the "Execute" button to send the request to the server.

## View Responses

1. Once you execute a request, the Swagger UI will display the server response.
2. Responses include status codes and corresponding messages or data returned by the server.

## Authorization

1. For endpoints that require authorization, such as profile retrieval and logout, you need to provide a JWT token.
2. To authorize requests, click on the "Authorize" button at the top right corner of the Swagger UI.
3. Enter the JWT token obtained after successful login and click "Authorize."
4. After authorization, subsequent requests will automatically include the JWT token in the header.

## Testing Endpoints

1. Use the Swagger UI to test various endpoints and verify their functionality.
2. Make sure to follow the provided guidelines and input valid data for accurate testing results.

## Troubleshooting

1. If you encounter any errors or unexpected behavior, refer to the Swagger documentation for endpoint descriptions and error responses.
2. Ensure that you provide valid input data and follow the specified request formats.

## Task 2: Public APIs with Filtering

#### Retrieve Public APIs

- **URL**: `GET http://localhost:{running_port_no(ex:3000 or 3001}/api/publicapis`
- **Description**: Retrieve public APIs with optional filtering based on category and limit.
- **Parameters**:
    - `category`: Filter APIs by category (case-insensitive).
    - `limit`: Limit the number of results.
- **Responses**:
    - `200`: A list of public APIs matching the filter criteria.
    - `400`: Bad request, typically due to an invalid limit parameter.
    - `500`: Internal server error.

#### Sample API Request

```http
GET http://localhost:{running_port_no(ex:3000 or 3001}/api/publicapis?category=Animals&limit=5

```

This is a sample API request to retrieve public APIs filtered by the "Animals" category with a limit of 5 results. To execute this request:

1. Open the Swagger UI interface at `http://localhost:{running_port_no(ex:3000 or 3001}/api-docs/`.
2. Find the endpoint labeled "Retrieve Public APIs with Optional Filtering" under the "Public APIs" tag.
3. Click on the endpoint to expand it and view the details.
4. Click on the "Try it out" button.
5. Enter "Animals" in the "category" field and "5" in the "limit" field.
6. Click the "Execute" button to send the request to the server.
7. View the response below to see the filtered public APIs.

You can access all API requests in the app.http file.

### Swagger Documentation Output for Task 2
![image](https://github.com/rakesh4902/Pioneer-Labs-Backend-Assessment/assets/83058036/41ad6bce-fa60-47af-8cf5-353da764692b)

## Task 4: Retrieve Data for Authenticated Users



#### 1. Log In as a User

- **URL**: `POST http://localhost:3000/login`
- **Description**: Log in as a user with the provided username and password.
- **Request Body**:
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```
- **Response**:
  - **200 OK**: User logged in successfully
    ```json
    {
        "token": "your_generated_jwt_token"
    }
    ```
  - **401 Unauthorized**: Invalid username or password

### Access Authenticated Data

Once logged in as a user, follow these steps to access authenticated data:

1. Click on the "Authorize" button on the top right corner of the Swagger UI.
2. Enter the JWT token obtained after successful login and click "Authorize".
3. Navigate to the `/api/data` endpoint in the Swagger UI.
4. Click on the "Try it out" button.
5. Execute the request to retrieve authenticated user data.
6. View the response to see the results returned by the server.

### Swagger Documentation

The API is documented using Swagger. You can access the Swagger UI interface to explore the API endpoints and interact with them. Follow these steps:

1. Open your web browser and navigate to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/).
2. Use the Swagger UI interface to view the available endpoints, their descriptions, request/response formats, and security requirements.
3. Click on each endpoint to expand it and view detailed documentation.
4. Click on the "Authorize" button on the top right corner of the Swagger UI.
5. Enter the JWT token obtained after successful login and click "Authorize".
6. Interact with the endpoints by clicking the "Try it out" button and providing the required input parameters.
7. View the responses to see the results returned by the server.


#### 2. Retrieve Data
- **URL**: `GET http://localhost:3000/api/data`
- **Description**: Retrieve some data for authenticated users.
- **Security**: Bearer Token (JWT obtained after successful login)
- **Response**:
  - **200 OK**: Successful operation
    ```json
    {
        "message": "Authenticated user data",
        "user": {
            "username": "example_user"
        }
    }
    ```
### Swagger Documentation Output for Task 4
![image](https://github.com/rakesh4902/Pioneer-Labs-Backend-Assessment/assets/83058036/4753a470-590f-4c84-9249-719dccbade28)

You can access all API requests in the app.http file.

## Task 5: Ethereum Account Balance API

#### Get Ethereum Account Balance

- **Endpoint**: `GET /balance/{address}`
- **Description**: Retrieve the balance of the specified Ethereum account.
- **Parameters**:
  - `address`: Ethereum address to get the balance for.
- **Responses**:
  - **200 OK**: Successful response with Ethereum account balance.
    ```json
    {
        "address": "ethereum_address",
        "balance": "account_balance_in_ether"
    }
    ```
  - **400 Bad Request**: Invalid Ethereum address.
  - **500 Internal Server Error**: Internal server error.
- sample request
- ** URL ** :`GET http://localhost:3000/balance/0x72d38F294aeDBfbF8F2ae7fb98a4e78079948526`

### Swagger Documentation

The API is documented using Swagger. You can access the Swagger UI interface to explore the API endpoints and interact with them. Follow these steps:

1. Open your web browser and navigate to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/).
2. Use the Swagger UI interface to view the available endpoints, their descriptions, request/response formats, and parameters.
3. Click on each endpoint to expand it and view detailed documentation.
4. Execute requests by clicking the "Try it out" button and providing the required parameters.
5. View the responses to see the results returned by the server.

### Sample Ethereum Addresses

Here are some sample Ethereum addresses to check balances:

1. 0x388C818CA8B9251b393131C08a736A67ccB19297
2. 0x848D30F307f02F1Ca92b71Be8BF5B28256F8d9bE
3. 0x72d38F294aeDBfbF8F2ae7fb98a4e78079948526

For more Ethereum addresses, you can visit [Ethplorer](https://ethplorer.io/address/0xd76b5c2a23ef78368d8e34288b5b65d616b746ae#pageTab=transfers).

### Swagger Documentation Output for Task 5
![image](https://github.com/rakesh4902/Pioneer-Labs-Backend-Assessment/assets/83058036/8f0d3883-ef20-42e3-a86e-c3275af16100)

You can access all API requests in the app.http file.






