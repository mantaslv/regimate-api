# Regimate API

Regimate API is the backend for the Regimate application, a workout tracking and planning tool. This API is built using Node.js, Express, and MongoDB. It provides endpoints for managing users and workouts.

## Getting Started

To get started with the Regimate API, you will need to have Node.js and MongoDB installed on your system. Once you have those installed, follow these steps:

Clone the repository:

```bash
git clone https://github.com/mantaslv/regimate-api.git
```

Install the dependencies:

```
npm install
```

Create a .env file in the root of the project and set the following environment variables:

```
PORT=3000
MONGODB_URI=<your MongoDB connection string>
JWT_SECRET=<your JWT secret>
```

Start the server:

```sql
npm start
```

The server should now be running on http://localhost:3000.

## API Endpoints

The Regimate API provides the following endpoints:

### Users

    POST /users/register: Register a new user
    POST /users/login: Log in an existing user

### Workouts

    GET /workouts: Get a list of all workouts
    GET /workouts/:id: Get details about a specific workout
    POST /workouts: Create a new workout
    PATCH /workouts/:id: Update an existing workout
    DELETE /workouts/:id: Delete a workout

### Errors

If there is an error processing a request, the API will return an error response in the following format:


```
{
    "error": <error message>
}
```

## Authentication

The Regimate API uses JSON Web Tokens (JWT) for authentication. To access protected endpoints, you will need to include an access token in the Authorization header of your requests. To obtain an access token, send a POST request to /users/login with a valid username and password. The response will include a token that can be used to authenticate subsequent requests.

## Testing

To run the tests for the Regimate API, run the following command:

```bash
npm test
```

This will run a suite of unit tests using Jest.

## Deployment

The Regimate API is currently deployed on Render at https://regimate.onrender.com/.
