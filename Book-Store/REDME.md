Book Store API

A beginner-friendly Book Store REST API built with Node.js,
Express.js, and MongoDB/Mongoose.

This project demonstrates the basic CRUD operations for books:

Create a book

Get a book by ID

Update a book

Delete a book

Connect Node.js with MongoDB using Mongoose

Use .env for the MongoDB connection string

Test APIs using Postman

📌 Technologies Used

Node.js

Express.js

MongoDB

Mongoose

Nodemon

Postman

📁 Project Structure

Book-Store/
│
├── node_modules/
│
├── src/
│   ├── controller/
│   │   └── controller.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── modals/
│   │   └── userModals.js
│   │
│   └── routes/
│       └── userRoutes.js
│
├── .env
├── package.json
├── package-lock.json
└── server.js

What each file does

File                                Purpose

server.js                         Starts the Express server and
connects the application

src/db/db.js                      Connects Node.js to MongoDB

src/modals/userModals.js          Defines the Book schema and
Mongoose model

src/controller/controller.js      Contains CRUD business logic

src/routes/userRoutes.js          Defines API routes

.env                              Stores environment variables such
as MongoDB URL

🖼️ Project Screenshot

The screenshot below shows the project structure in VS Code.



⚙️ Installation

1. Clone or open the project

Open the Book-Store folder in VS Code.

2. Install dependencies

Run:

npm install

If the packages are not already installed, you can install the main
packages with:

npm install express mongoose dotenv
npm install --save-dev nodemon

🔐 Environment Variables

Create a .env file in the root folder.

Example:

PORT=4000
MONGODB_URL=mongodb://localhost:27017/book-store

Keep .env private and add it to .gitignore if you upload the
project to GitHub.

Example .gitignore:

node_modules/
.env

🗄️ MongoDB Connection

The database connection is handled in:

src/db/db.js

The application uses:

mongoose.connect(process.env.MONGODB_URL)

When the connection is successful, the terminal should show:

Database connected

▶️ Run the Project

Start the project with:

npm run start

If nodemon is configured in package.json, the server will
automatically restart when you change your code.

Example terminal output:

[nodemon] starting `node server.js`
server is working on PORT 5000
Database connected

The base server URL is:

http://localhost:5000

📚 Book Data Structure

Each book contains:

{
  "bookname": "Atomic Habits",
  "authorname": "James Clear",
  "price": "500",
  "category": "Self Help"
}

Fields

Field          Type     Required

bookname     String   Yes
authorname   String   Yes
price        String   Yes
category     String   Yes
createdAt    Date     Automatically created
updatedAt    Date     Automatically updated

🔄 API Endpoints

1. Add Book

Method

POST

URL

http://localhost:5000/api/books/addbook

If your server.js uses a different route prefix, replace
/api/books with the prefix used in your application.

Body → raw → JSON

{
  "bookname": "Atomic Habits",
  "authorname": "James Clear",
  "price": "500",
  "category": "Self Help"
}

Expected response

{
  "message": "Book added successfully",
  "newbook": {
    "bookname": "Atomic Habits",
    "authorname": "James Clear",
    "price": "500",
    "category": "Self Help"
  }
}

2. Get Book by ID

Method

GET

URL

http://localhost:5000/api/books/getbook/:id

Example:

http://localhost:5000/api/books/getbook/68xxxxxxxxxxxxxxxxxxxx

The :id is the MongoDB document ID.

Expected response

{
  "message": "Book found successfully",
  "book": {
    "_id": "68xxxxxxxxxxxxxxxxxxxx",
    "bookname": "Atomic Habits",
    "authorname": "James Clear",
    "price": "500",
    "category": "Self Help"
  }
}

3. Update Book

Method

PUT

URL

http://localhost:5000/api/books/updatebook/:id

Example:

http://localhost:5000/api/books/updatebook/68xxxxxxxxxxxxxxxxxxxx

Body

{
  "bookname": "Atomic Habits Updated",
  "authorname": "James Clear",
  "price": "550",
  "category": "Self Help"
}

4. Delete Book

Method

DELETE

URL

http://localhost:5000/api/books/deletebook/:id

Example:

http://localhost:5000/api/books/deletebook/68xxxxxxxxxxxxxxxxxxxx

The book with that MongoDB ID will be deleted.

🧪 Testing with Postman

Use Postman to test all four CRUD APIs.

Step 1 --- Start the server

npm run start

Step 2 --- Open Postman

Create a new request.

Step 3 --- Test Add Book

Select:

POST

Enter:

http://localhost:5000/api/books/addbook

Go to:

Body → raw → JSON

Paste:

{
  "bookname": "The Alchemist",
  "authorname": "Paulo Coelho",
  "price": "350",
  "category": "Fiction"
}

Click Send.

Step 4 --- Copy the MongoDB ID

After creating the book, the response contains an _id.

Example:

"_id": "68xxxxxxxxxxxxxxxxxxxx"

Copy this ID.

You will use it for:

Get

Update

Delete

🎥 Screen Recording / Video Shooting

For the assignment or practical submission, record a short video showing
your complete project.

Recommended video order

1. Introduction

Turn on your camera and microphone if your teacher requires face +
voice.

Say:

"Hello Sir, my name is Nishtha. Today I am demonstrating my Book Store
REST API project using Node.js, Express.js, MongoDB and Mongoose."

2. Show the project structure

Open VS Code and show:

Book-Store
├── src
│   ├── controller
│   ├── db
│   ├── modals
│   └── routes
├── .env
├── package.json
└── server.js

Explain briefly:

"I have separated my project into database, model, controller and
routes so that the CRUD logic is not written in one file."

3. Explain the database connection

Open:

src/db/db.js

Explain:

"This file is responsible for connecting my Node.js application with
MongoDB using Mongoose."

Show:

mongoose.connect(process.env.MONGODB_URL)

4. Explain the model

Open:

src/modals/userModals.js

Explain:

"This is my Book schema. It defines book name, author name, price and
category. I am using Mongoose to create the Book model."

5. Explain the controller

Open:

src/controller/controller.js

Show these functions:

addbook
getbook
updatebook
deletebook

Say:

"I have created four controller functions for CRUD operations."

6. Explain the routes

Open:

src/routes/userRoutes.js

Show:

POST   /addbook
GET    /getbook/:id
PUT    /updatebook/:id
DELETE /deletebook/:id

7. Run the server

Open the terminal and run:

npm run start

Show:

server is working on PORT 4000
Database connected

8. Demonstrate Add Book

Open Postman.

Show the POST request and JSON body.

Click Send.

Show the successful response.

9. Demonstrate Get Book

Copy the _id.

Use:

GET /getbook/:id

Click Send.

Show the book response.

10. Demonstrate Update Book

Use:

PUT /updatebook/:id

Change one or more values.

Click Send.

Show the updated book.

11. Demonstrate Delete Book

Use:

DELETE /deletebook/:id

Click Send.

Show:

Book deleted successfully

12. Finish the video

Say:

"This completes my Book Store REST API CRUD project. Thank you."

🎬 What Should Be Visible in the Recording?

Try to keep these visible while recording:

Your face, if required by your teacher

Your voice/microphone

VS Code

Project folder structure

Important code files

Terminal

Postman

API requests and responses

Avoid showing:

Passwords

Private API keys

Personal information

Your .env secret values

🧠 CRUD Explanation

CRUD means:

Operation   HTTP Method   Purpose

Create      POST          Add a new book
Read        GET           Get a book
Update      PUT           Update an existing book
Delete      DELETE        Delete a book

A simple real-world example:

POST   → Add a new book
GET    → See a book
PUT    → Change book details
DELETE → Remove a book

🏗️ Request Flow

The project follows this basic flow:

Postman
   ↓
Route
   ↓
Controller
   ↓
Model
   ↓
Mongoose
   ↓
MongoDB

For example, when adding a book:

Postman
   ↓
POST /addbook
   ↓
addbook controller
   ↓
Book.create()
   ↓
MongoDB

⚠️ Important Route Correction

Because getbook, updatebook, and deletebook use:

req.params.id

their routes should include /:id.

Use:

router.post("/addbook", addbook);

router.get("/getbook/:id", getbook);

router.put("/updatebook/:id", updatebook);

router.delete("/deletebook/:id", deletebook);

Without /:id, req.params.id will be undefined.

📝 Known Code Fix

In your controller, this line:

return res.ststus(404).json({message : "Book not found"})

should be:

return res.status(404).json({message : "Book not found"})

status is spelled with one t after sta.

📌 Future Improvements

Possible improvements for this project:

Add validation for price

Add pagination

Add search by book name

Add category filtering

Add authentication with JWT

Add user registration/login

Add frontend using React

Add deployment

Add API documentation


#Project Video

Add your project demonstration video link here.

Project Video:
PASTE YOUR VIDEO LINK HERE

For example:

(https://drive.google.com/file/d/1YObokV-HkQLlXTy28dL-wZepTNH2VRks/view?usp=drive_link)



👩‍💻 Author

Nishtha

Book Store REST API project built for learning Node.js backend
development.