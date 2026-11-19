const express = require("express");
const { registration, login , logout } = require("../controller/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/register" , registration)
router.post("/login" , login)

router.get("/profile" , authMiddleware , (req , res) => {
    res.status(200).json({message : "profile acessed successfully" , userId : req.userId})
   
})

router.post("/logout" , logout)

module.exports = router