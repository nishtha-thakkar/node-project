const express = require("express");


const { blogcreate,getblog , updateBlog , deleteBlog  } = require("../controller/controller");

const router = express.Router();

router.post("/addBlog", blogcreate);
router.get("/getblog/:id" , getblog);
router.patch("/updateblog/:id" , updateBlog )
router.delete("/deleteblog/:id" , deleteBlog)

module.exports = router;