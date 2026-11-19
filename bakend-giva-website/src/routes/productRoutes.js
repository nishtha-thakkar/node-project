const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const{addProduct, getProduct , updateProduct , deleteProduct, getProductById, searchProduct, filterProducts} = require("../controller/productController")
const upload = require("../middleware/multer");
const { adminMiddleware } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/add-product" , authMiddleware , adminMiddleware , upload.single("image") , addProduct)
router.get("/get-product" , getProduct )
router.get("/get-product/:id" , getProductById)
router.get("/search-product" , searchProduct)
router.get("/filter-product", filterProducts)
router.put("/update-product/:id" , authMiddleware , adminMiddleware , updateProduct)
router.delete("/delete-product/:id" , authMiddleware , adminMiddleware , deleteProduct)

module.exports = router

