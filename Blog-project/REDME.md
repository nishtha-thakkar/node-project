# Blog API

A simple Blog CRUD REST API built using **Node.js, Express.js, and MongoDB**.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv

## Features

* Create a new blog
* Get a blog by ID
* Update a blog
* Delete a blog
* MongoDB database connection
* API validation and error handling

## Project Structure

```text
Blog-project/
│
├── src/
│   ├── controller/
│   │   └── controller.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── model/
│   │   └── blogModel.js
│   │
│   └── router/
│       └── router.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Installation

Clone the project and install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root folder:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
```

## Run the Project

Start the server:

```bash
npm start
```

Or:

```bash
node server.js
```

The server will run on:

```text
http://localhost:5000
```

## API Endpoints

### 1. Create Blog

```http
POST /api/blog/addBlog
```

Request Body:

```json
{
  "title": "My First Blog",
  "author": "Nishtha",
  "content": "This is my first blog."
}
```

### 2. Get Blog

```http
GET /api/blog/getblog/:id
```

Example:

```text
GET /api/blog/getblog/68xxxxxxxxxxxxxxxxxxxx
```

### 3. Update Blog

```http
PATCH /api/blog/updateblog/:id
```

Request Body:

```json
{
  "title": "Updated Blog",
  "author": "Nishtha",
  "content": "Updated blog content."
}
```

### 4. Delete Blog

```http
DELETE /api/blog/deleteblog/:id
```

Example:

```text
DELETE /api/blog/deleteblog/68xxxxxxxxxxxxxxxxxxxx
```

## Database

This project uses **MongoDB** with **Mongoose**.

Make sure MongoDB is running and the `MONGODB_URL` is added to the `.env` file.

## Error Handling

The API handles:

* Required field validation
* Blog not found
* Duplicate blog title
* Invalid requests
* Server errors

#Project Video

Add your project demonstration video link here.

Project Video:
PASTE YOUR VIDEO LINK HERE

For example:
(https://drive.google.com/file/d/1JJu7u4dLWoDuwDCKd_j6nu2xthWwdHUC/view?usp=drive_link)

## Author

**Nishtha Thakkar**
