const express = require("express");
const { isAuthenticated } = require("../middleware/adminMiddleware");
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controller/productControler");
const { isAdmin2 } = require("../middleware/isAdmin2");

const router = express.Router();

router.post("/create" , isAuthenticated , isAdmin2, createProduct)
router.get("/all" , isAuthenticated , getAllProducts)
router.get("/single/:id" , isAuthenticated , getSingleProduct)
router.put("/update/:id" , isAuthenticated , isAdmin2, updateProduct)
router.delete("/delete/:id" , isAuthenticated, isAdmin2, deleteProduct)

module.exports = router