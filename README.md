Payment-api
A simple RESTful API for managing users and their payment transactions using Node.js, Express,and MySQL.

User APIs-
`POST /users` - Create a new user
`GET /users` - List all users
`PUT /users/:user_id` - Update a user
`DELETE /users/:user_id` - Delete a user

Payment APIs-
`POST /users/:user_id/payments` - Add a payment for a user
`GET /users/:user_id/payments` - View all payments for a user

Project Structure-
payment-api
1.config/
This folder contains configuration files, such as database configurations or environment variables that manage the setup for external services (like the database).

db.js:
Contains the configuration for connecting to my MySQL database.

2.controllers/
This folder contains controller functions that handle the business logic for my API. Controllers process incoming requests, interact with models, and send responses back to the client.

userController.js:
Handles requests related to users. It contain functions for creating, updating, listing, and deleting users.

paymentController.js:
Handles requests related to payments. This includes adding payments and retrieving payment histories for a given user.

3.models/
This folder contains models for the database tables. Models represent the structure of my database and allow you to interact with it using Sequelize ORM (Object-Relational Mapping).

user.js:
Represents the users table. The model defines the columns and their types, relationships to other tables, etc.

payment.js:
Represents the payments table. This model links to the user_id from the users table.

4.routes/
This folder defines the routes for my API endpoints. Routes map the incoming requests to the appropriate controller functions.

userRoutes.js:
Contains the route definitions for user-related actions (e.g., creating, listing, updating users).

paymentRoutes.js:
Contains the route definitions for payment-related actions (e.g., adding payments, viewing payments).

5.utils/
This folder contains utility functions that are used across the application, such as validating credit card numbers and encrypting sensitive data.

luhnCheck.js:
Contains the Luhn Algorithm for validating credit card numbers.

cardUtils.js:
Contains functions for masking and encrypting sensitive information, like the card number and CVV.

app.js
This is the entry point of my application. It initializes the Express server, sets up middleware, connects routes, and listens on a specific port.

Setup Instructions
1.Clone the repo

2.npm install

3.Configure Database
Update the config/db.js file or use a .env file to provide your MySQL credentials

4.Start the server

Database Schema

user table-
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100) UNIQUE,
phone VARCHAR(15),
country VARCHAR(3),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

payments table-
CREATE TABLE payments (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
amount DECIMAL(10, 2),
currency VARCHAR(10),
description TEXT,
card_no VARCHAR(16),
card_expiry VARCHAR(5),
card_cvc VARCHAR(3),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

API EndPoints
1.User APIs

1.1 Create a User
Endpoint - POST/users
Request-
{
"name":"Nancy Agrawal",
"email":"nancy@gmail.com",
"phone":"9691591556",
"country":"IN"
}
Response-
{
"id": 2,
"name": "Nancy Agrawal",
"email": "nancy@gmail.com",
"phone": "9691591556",
"country": "IN",
"updated_at": "2025-05-16T07:17:30.781Z",
"created_at": "2025-05-16T07:17:30.781Z"
}

1.2 Get All Users
Endpoint - GET/users
Response-
[
{
"id": 1,
"name": "Mani Agrawal",
"email": "agrawalmani16@gmail.com",
"phone": "7000518310",
"country": "IN",
"created_at": "2025-05-16T06:59:11.000Z",
"updated_at": "2025-05-16T07:15:26.000Z"
},
{
"id": 3,
"name": "Nancy Agrawal",
"email": "nancy@gmail.com",
"phone": "9691591556",
"country": "IN",
"created_at": "2025-05-16T08:56:08.000Z",
"updated_at": "2025-05-16T08:56:08.000Z"
}
]

1.3 Update a User
Endpoint- PUT/users/:user_id
Request-
{
"name":"Mani Agrawal",
"phone":"7000518310"
}
Response-
{
"message": "User updated"
}

1.4 Delete a User
Endpoint- DELETE/users/:user_id
Response-
{
"message": "User deleted"
}

2 Payment APIs

2.1 Add Payment for a User
Endpoint - POST/users/:user_id/payments
Request-
{
"amount": 100.50,
"currency": "USD",
"description": "Test payment",
"card_no": "4111111111111111",
"card_expiry": "12/2025",
"card_cvc": "123"
}
Response-
{
"id": 1,
"user_id": 1,
"amount": 100.50,
"currency": "USD",
"description": "Test payment",
"created_at": "2025-05-16T12:00:00Z"
}

2.2 Get all Payments for a User
Endpoint- GET/users/:user_id/payments
Response-
[
{
"id": 1,
"user_id": 1,
"amount": "100.50",
"currency": "USD",
"description": "Test payment",
"card_no": "************1111",
"card_expiry": "12/2025",
"card_cvc": "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
"created_at": "2025-05-16T07:04:16.000Z"
}
]
