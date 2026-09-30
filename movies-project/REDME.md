# Movie CRUD API

A simple Movie CRUD REST API built using **Node.js, Express.js, and MongoDB**.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv

## Features

* Add a movie
* Get a movie by ID
* Update a movie
* Delete a movie
* MongoDB database connection
* REST API

## Project Structure

```text
movies-project/
│
├── src/
│   ├── controller/
│   │   └── controller.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── model/
│   │   └── MovieModel.js
│   │
│   └── routes/
│       └── routes.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/movies
```

## Run Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Or:

```bash
node server.js
```

## API Endpoints

### Add Movie

```http
POST /api/movie/add-movie
```

Example body:

```json
{
  "movieName": "KGF",
  "favoriteHero": "Yash",
  "favoriteHeroine": "Srinidhi Shetty"
}
```

### Get Movie

```http
GET /api/movie/get-movie/:id
```

### Update Movie

```http
PATCH /api/movie/update-movie/:id
```

Example body:

```json
{
  "movieName": "KGF Chapter 2",
  "favoriteHero": "Yash",
  "favoriteHeroine": "Srinidhi Shetty"
}
```

### Delete Movie

```http
DELETE /api/movie/delete-movie/:id
```

## Database

This project uses MongoDB with Mongoose for storing movie information.

Movie fields:

* `movieName`
* `favoriteHero`
* `favoriteHeroine`
* `createdAt`
* `updatedAt`

#Project Video

Add your project demonstration video link here.

Project Video:
PASTE YOUR VIDEO LINK HERE

For example:

(https://drive.google.com/file/d/1y2QHtXxPljZWa03UkX8iduAgbRtOleYA/view?usp=drive_link)


## Author

Nishtha Thakkar
