# Recipe App Backend with Authentication and Email Verification

This is the backend for a Recipe App that allows users to search for recipes, view details, and save their favorite recipes. The backend also includes user authentication, email verification, and JWT-based protection for routes.

## Features

- User Registration with email verification
- User Login with JWT authentication
- Recipe search using the Spoonacular API
- Save and manage favorite recipes
- Protected routes using JWT

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Nodemailer for email verification
- Spoonacular API for recipe data

## Prerequisites

- Node.js installed
- MongoDB installed and running locally or use MongoDB Atlas
- API Key for Spoonacular API (create an account on [Spoonacular](https://spoonacular.com/food-api))

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/recipe-app-backend.git
   cd recipe-app-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:

   ```bash
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The server will run on `http://localhost:3000`. You can test the endpoints using Postman or any API testing tool.

## API Endpoints

- **POST** `/auth/register`: Register a new user (email verification is required)
- **POST** `/auth/login`: Login and receive a JWT
- **GET** `/auth/verify-email`: Verify email using the token sent to the user's email
- **GET** `/search`: Search for recipes using a query
- **GET** `/recipe/:id`: Get detailed information about a specific recipe
- **POST** `/favorites`: Save a recipe to favorites (protected route)
- **GET** `/favorites`: Retrieve favorite recipes (protected route)

## Assumptions

- The app assumes that users must verify their email before logging in.
- The app assumes a valid MongoDB URI and Spoonacular API key are provided in the `.env` file.
- No frontend client URL is assumed for email verification; instead, the server handles it.

## Notes

- For email verification, make sure your email credentials (like Gmail) allow third-party apps or generate an app-specific password.
- If you are using a different port or environment for MongoDB, adjust the `MONGO_URI` accordingly in the `.env` file.
- To secure your `.env` file, make sure it's listed in your `.gitignore` to avoid exposing sensitive information.


