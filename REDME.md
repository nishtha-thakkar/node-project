Admin Panel Backend Project

Project Overview

This is an Admin Panel Backend Project developed using Node.js, Express.js, and MongoDB.

The project provides secure authentication using JWT, role-based authorization, and complete CRUD operations for product management.

Admins can manage products, view product details, update product information, and delete products.

Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- cookie-parser
- Postman
- Git & GitHub

Features

1. Admin Authentication

- Admin Registration
- Admin Login
- JWT Token Generation
- Get Admin Profile
- Admin Logout
- Password Hashing
- Protected Routes

2. Role-Based Authorization

- User and Admin Roles
- Role-Based Middleware
- Admin-Only Access
- Unauthorized Access Handling

3. Product Management

- Create Product
- Get All Products
- Get Single Product
- Update Product (PATCH)
- Delete Product

4. Dashboard

- Total Products
- Total Admins
- Total Stock
- Total Inventory Value

5. Error Handling

- Input Validation
- Invalid Product ID Handling
- Product Not Found Handling
- Authentication Error Handling
- Server Error Handling

Project Structure

Admin-project/
│
├── src/
│   ├── controller/
│   │   ├── adminController.js
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   └── isAdmin2.js
│   │
│   ├── models/
│   │   ├── isAdmin.js
│   │   └── productModel.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   └── productRoutes.js
│   │
│   └── utils/
│       └── generateToken.js
│
├── server.js
├── package.json
├── .env
└── README.md

API Endpoints

Admin APIs

Method| Endpoint| Description
POST| /admin/project/register| Register Admin
POST| /admin/project/login| Login Admin
GET| /admin/project/getprofile| Get Admin Profile
POST| /admin/project/logout| Logout Admin
GET| /admin/project/dashboard| Dashboard Summary

Product APIs

Method| Endpoint| Description
POST| /admin/product/create| Create Product
GET| /admin/product/all| Get All Products
GET| /admin/product/single/:id| Get Single Product
PATCH| /admin/product/update/:id| Update Product
DELETE| /admin/product/delete/:id| Delete Product

Note: Verify the Admin API paths against "adminRoutes.js" before submission.

Installation and Setup

Step 1: Clone Repository

git clone <your-github-repository-url>

Step 2: Open Project

cd Admin-project

Step 3: Install Dependencies

npm install

Step 4: Environment Variables

Create a ".env" file in the project root directory.

Example:

PORT=3000
MONGO_URI=your_mongodb_connection_string
SECREAT_KEY=your_jwt_secret_key

Use the exact environment variable names referenced in your project code.

Step 5: Start Server

npm run dev

Or:

npm start

Use the command configured in "package.json".

Product CRUD Operations

Create Product

Method: POST

Endpoint:

http://localhost:3000/admin/product/create

Request Body:

{
  "name": "Laptop",
  "price": 45000,
  "description": "Dell Laptop",
  "category": "Electronics",
  "stock": 10
}

Get All Products

Method: GET

http://localhost:3000/admin/product/all

Returns all products stored in MongoDB.

Get Single Product

Method: GET

http://localhost:3000/admin/product/single/PRODUCT_ID

Returns the details of a specific product.

Update Product

Method: PATCH

http://localhost:3000/admin/product/update/PRODUCT_ID

Request Body:

{
  "price": 55000,
  "stock": 20
}

Updates the specified product.

Delete Product

Method: DELETE

http://localhost:3000/admin/product/delete/PRODUCT_ID

Deletes the specified product from MongoDB.

Authentication and Authorization

JWT authentication is used to protect private API endpoints.

After successful login, the authentication token is stored in a cookie.

The authentication middleware verifies the token before allowing access to protected routes.

Role-based middleware checks whether the authenticated user has the required admin role.

API Testing

All backend APIs can be tested using Postman.

Testing steps:

1. Register an account.
2. Login with valid credentials.
3. Verify the JWT authentication cookie.
4. Test protected API endpoints.
5. Create a product.
6. Fetch all products.
7. Fetch a single product using its ID.
8. Update product details.
9. Delete a product.
10. Verify that the deleted product is no longer available.
11. Test logout functionality.

Security Features

- JWT Authentication
- Password Hashing
- Protected API Routes
- Role-Based Authorization
- Environment Variables
- Error Handling

Future Improvements

- Frontend Admin Dashboard
- Product Image Upload
- Product Search and Filtering
- Pagination
- User Management
- Advanced Dashboard Analytics

Project Conclusion

This project demonstrates backend development using Node.js, Express.js, and MongoDB.

It includes authentication, authorization, REST API development, and CRUD operations.

The project helped me understand how backend applications manage users, products, databases, and secure API endpoints.

project video:
(https://drive.google.com/drive/folders/1-67wML_ljX-cNF9GfNMi12sQ3gazC913?usp=drive_link)


Author

Developed as part of a Node.js Backend Development Project.