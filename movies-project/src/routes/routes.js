const express = require("express");
const { addMovie, getMovie, updateMovie, deleteMovie } = require("../controller/controller");

const router = express.Router();

router.post("/add-movie" , addMovie)
router.get("/get-movie/:id" , getMovie)
router.patch("/update-movie/:id" , updateMovie);
router.delete("/delete-movie/:id" , deleteMovie)

module.exports = router;