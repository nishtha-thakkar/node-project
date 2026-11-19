const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {adminMiddleware} = require("../middleware/adminMiddleware")
const { placeOrder , getMyOrders , getAllOrders, updateOrderStatus , getSingleOrder } = require("../controller/orderController");

const router = express.Router();

//user place order

router.post("/place-order" , authMiddleware , placeOrder) // consumer
router.get("/my-orders" , authMiddleware , getMyOrders)//admin , consumer
router.get("/all-order" , authMiddleware , adminMiddleware , getAllOrders)  // all user order only admin can see
router.patch("/update-status/:orderId" , authMiddleware , adminMiddleware , updateOrderStatus)
router.get("/single-order/:orderId" , authMiddleware , getSingleOrder)

module.exports = router;