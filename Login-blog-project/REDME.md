# Login System with Blog

## Project Description

This project is a Login System with Blog built using Node.js, Express.js, MongoDB, and Mongoose. It includes user registration, login, logout, authentication using JWT, and blog CRUD operations.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- cookie-parser
- dotenv

## Project Features

### Authentication
- User Registration
- User Login
- User Logout
- JWT-based Authentication
- Get User Profile
- Password Hashing using bcryptjs

### Blog Management
- Create a Blog
- Get a Blog by ID
- Update a Blog
- Delete a Blog
- Check for Duplicate Blog Titles
- Authentication Required for Creating and Updating Blogs

## Project Structure

```text
Login-blog-project/
│
├── server.js
├── .env
├── .gitignore
├── package.json
│
└── src/
    ├── db/
    │   └── db.js
    │
    ├── model/
    │   ├── user.js
    │   └── blog.js
    │
    ├── controllers/
    │   ├── authcontroller.js
    │   └── blogcontroller.js
    │
    ├── middleware/
    │   └── authMiddleware.js
    │
    ├── routes/
    │   ├── userRoutes.js
    │   └── blogRoutes.js
    │
    └── utils/
        └── generateToken.js
```

## Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project Folder

```bash
cd Login-blog-project
```

### 3. Install Dependencies

```bash
npm install
```

Install the required packages if they are not already in `package.json`:

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

Use your actual MongoDB connection string and a strong secret key. Do not upload `.env` to GitHub.

**Important:** Your authentication middleware currently uses `process.env.SECREAT_KEY`. Change it to `process.env.SECRET_KEY`, or use the same spelling in your `.env` file.

### 5. Start the Server

```bash
npm run start
```

If your `package.json` does not have a start script, add:

```json
"scripts": {
  "start": "node server.js"
}
```

## API Endpoints

Base URL: `http://localhost:5000`

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/blog/login/registation` | Register a new user |
| POST | `/blog/login/login` | Login user |
| POST | `/blog/login/logout` | Logout user |
| GET | `/blog/login/profile` | Get logged-in user profile |

### Blog APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/blog/create` | Create a new blog |
| GET | `/blog/get/:id` | Get blog by ID |
| PATCH | `/blog/update/:id` | Update a blog |
| DELETE | `/blog/delete/:id` | Delete a blog |

## Request Body Examples

### User Registration

```json
{
  "name": "Nishtha",
  "email": "nishtha@example.com",
  "password": "password123"
}
```

### User Login

```json
{
  "email": "nishtha@example.com",
  "password": "password123"
}
```

### Create Blog

```json
{
  "title": "Introduction to Node.js",
  "author": "Nishtha",
  "content": "Node.js allows us to run JavaScript outside the browser."
}
```

### Update Blog

Send the fields you want to update using the same JSON structure as the Create Blog request.

## Authentication

- Passwords are hashed using bcryptjs before storing them in MongoDB.
- JWT is used to authenticate users.
- The authentication middleware verifies the JWT token.
- The token is stored in an HTTP cookie by the token-generation utility.
- Protected routes require a valid authentication cookie.

## Testing

Use Postman to test all API endpoints.

1. Register a new user.
2. Log in with the registered credentials.
3. Create a blog while authenticated.
4. Retrieve a blog using its ID.
5. Update the blog.
6. Delete the blog.
7. Access the user profile.
8. Log out and test protected routes again.

***Video Url

(https://drive.google.com/file/d/1JJu7u4dLWoDuwDCKd_j6nu2xthWwdHUC/view?usp=drive_link)

## Author

Nishtha Sodha
