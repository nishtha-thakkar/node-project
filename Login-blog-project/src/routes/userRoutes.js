const express = require("express");
const { registration, login, logOut, getProfile } = require("../controllers/authcontroller");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/registation" , registration)
router.post("/login" , login)
router.post("/logout" , logOut)
router.get("/profile", isAuthenticated , getProfile)

module.exports = router