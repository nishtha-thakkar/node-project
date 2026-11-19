GIVA Jewellery — Backend API

A RESTful backend API for a full-stack jewellery e-commerce application, built using Node.js, Express.js, and MongoDB.

The backend provides user authentication, product management, shopping cart functionality, order processing, inventory management, and role-based access control.

Tech Stack

- Node.js — JavaScript runtime
- Express.js — Backend framework
- MongoDB Atlas — Cloud database
- Mongoose — MongoDB object modeling
- JWT — Authentication
- bcrypt — Password hashing
- Cloudinary — Product image storage
- Multer — Image uploads
- Zod — Request validation
- Postman — API testing

Features

1. User Authentication

- User registration
- User login and logout
- JWT-based authentication
- Cookie-based token handling
- Password hashing
- Protected API routes
- Admin and customer role-based access

2. Product Management

- Create new products
- Retrieve all products
- Update product information
- Delete products
- Upload product images using Cloudinary
- Search products
- Filter products by category and price
- Manage product stock
- Restrict product management operations to administrators

3. Shopping Cart

- Add products to cart
- View cart items
- Update product quantity
- Remove products from cart
- Validate available stock
- Associate carts with authenticated users

4. Order Management

- Place orders from the shopping cart
- View personal order history
- Retrieve individual order details
- View all orders as an administrator
- Update order status
- Cancel orders
- Deduct stock when an order is placed
- Restore stock when an order is cancelled
- Use MongoDB transactions for consistent order and stock updates

5. Order Status Workflow

Orders follow these statuses:

"Pending → Confirmed → Shipped → Delivered"

Orders may also be cancelled according to the configured status transition rules.

6. Security

- JWT verification middleware
- Protected routes
- Admin authorization middleware
- Order ownership verification
- Duplicate email registration checks
- Invalid login credential handling
- Request validation
- Restricted access to other customers' orders

Project Structure

backend/
├── src/
│   ├── controller/
│   │   ├── orderController.js
│   │   └── ...
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── ...
│   ├── model/
│   │   ├── orderModel.js
│   │   ├── cartModel.js
│   │   └── ...
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   └── ...
│   └── ...
├── .env
├── package.json
└── README.md

Additional files and folders depend on the project's implementation.

Installation and Setup

Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

You also need:

- A MongoDB Atlas database
- A Cloudinary account

Step 1: Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL

Step 2: Navigate to Backend

cd backend

Step 3: Install Dependencies

npm install

Step 4: Configure Environment Variables

Create a ".env" file inside the backend directory.

Example:

PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Important: Match the environment variable names with those used in your source code. Never commit the ".env" file or real credentials to GitHub.

Step 5: Start the Backend Server

Run the development command configured in "package.json".

For example, if a "dev" script is configured:

npm run dev

The backend is configured locally to run on:

http://localhost:8080

API Endpoints

The following endpoints are implemented or represented in the project.

Authentication APIs

Method| Endpoint| Description
POST| "/giva/website/register"| Register a new user
POST| "/giva/website/login"| Login
POST| Logout route| Logout user

Product APIs

The product module supports:

Method| Operation
POST| Create product
GET| Get products
PUT/PATCH| Update product
DELETE| Delete product
GET| Search and filter products

The exact endpoint paths are defined in the project's product routes.

Cart APIs

Method| Operation
POST| Add product to cart
GET| View cart
PATCH/PUT| Update cart quantity
DELETE| Remove product from cart

The exact endpoint paths are defined in the project's cart routes.

Order APIs

Method| Endpoint| Access
POST| "/giva/website/order/place-order"| Authenticated user
GET| "/giva/website/order/my-orders"| Authenticated user
GET| "/giva/website/order/single-order/:orderId"| Order owner or admin
GET| "/giva/website/order/all-orders"| Admin
PATCH| "/giva/website/order/update-status/:orderId"| Admin

Sample API Requests

Register User

POST "/giva/website/register"

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@12345"
}

Login User

POST "/giva/website/login"

{
  "email": "test@example.com",
  "password": "Test@12345"
}

Update Order Status

PATCH "/giva/website/order/update-status/:orderId"

{
  "status": "Confirmed"
}

Database Collections

The application uses MongoDB collections for:

- Users — Customer and administrator accounts
- Products — Jewellery products, prices, categories, images, and stock
- Carts — Customer shopping carts
- Orders — Order items, quantities, prices, shipping addresses, and statuses

Testing

The APIs are tested using Postman.

Test scenarios include:

- Successful user registration and login
- Duplicate email registration
- Invalid login credentials
- Authentication without a token
- Admin-only route access
- Product creation, updates, and deletion
- Product filtering and searching
- Cart operations and stock validation
- Order creation and status updates
- Single-order access control
- Order cancellation and inventory handling

Frontend Integration

This backend is designed to integrate with a React frontend.

The planned full-stack application will include:

- Home page
- Product listing and details
- User registration and login
- Shopping cart
- Checkout
- Order history
- Admin dashboard
- Product and order management

Future Improvements

- Online payment gateway integration
- Wishlist functionality
- Product ratings and reviews
- Email notifications
- Advanced admin analytics
- Deployment and production monitoring

Project Status

Backend: Core features implemented; final integration and regression testing ongoing.

Frontend: Planned using React, Vite, and Tailwind CSS.

//***video explanation

(https://drive.google.com/file/d/120CJfw6esg1oHSgd4Ba9__NXsCwuDspq/view?usp=drive_link)

Author

Developed as part of a  bakend jewellery e-commerce project.