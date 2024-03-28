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
    nodemon app.js
    ```

    The server will start running on a specified port, usually port 3000 or 3001.

## Task Documentation

### Task 1: User Authentication APIs

#### Register a New User

- **URL**: `POST http://localhost:3001/register`
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

- **URL**: `POST http://localhost:3001/login`
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

- **URL**: `GET http://localhost:3001/profile`
- **Authorization**: Bearer Token (JWT obtained after successful login)

    Get the profile information of the authenticated user.

#### Log Out

- **URL**: `POST http://localhost:3001/logout`
- **Authorization**: Bearer Token (JWT obtained after successful login)

    Log out the authenticated user.



# Swagger API Documentation Usage

The Swagger API documentation provides a comprehensive guide to interact with the User Authentication APIs. Follow these steps to effectively use the Swagger documentation:

## Access Swagger UI

1. Open your web browser and navigate to the following URL: http://localhost:3001/api-docs/
This URL will display the Swagger UI interface containing all available API endpoints and their descriptions.

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


---

