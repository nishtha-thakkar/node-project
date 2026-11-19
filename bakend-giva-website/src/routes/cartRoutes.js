const express = require("express");
const { addToCart, getCart, removeFromCart, updateCartQuantity } = require("../controller/cartController");
const{authMiddleware} = require("../middleware/authMiddleware")
const router = express.Router();

router.post("/add-to-cart" , authMiddleware , addToCart)
router.get("/get-cart" , authMiddleware , getCart)
router.delete("/remove-from-cart" , authMiddleware , removeFromCart)
router.put("/update-cart" , authMiddleware , updateCartQuantity)

module.exports = router;