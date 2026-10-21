const express = require("express");
const { isAuthenticated } = require("../middleware/authMiddleware");
const { blogcreate , getblog, updateBlog, deleteBlog } = require("../controllers/blogcontroller");
const router = express.Router();

router.post("/create" , isAuthenticated , blogcreate)
router.get("/get/:id" , getblog)
router.patch("/update/:id" , isAuthenticated, updateBlog)
router.delete("/delete/:id" , deleteBlog)


module.exports = router;