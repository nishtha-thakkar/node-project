const express = require("express")
const { registerAdmin, loginAdmin, logOut, getProfile, getDashboard } = require("../controller/adminController")
const { isAuthenticated } = require("../middleware/adminMiddleware")
const { isAdmin2 } = require("../middleware/isAdmin2")

const router = express.Router()

router.post("/registration" , registerAdmin )
router.get("/login", loginAdmin)
router.post("/logout" , logOut)
router.get("/getprofile" , isAuthenticated , getProfile )
router.get("/dashboard" , isAuthenticated , getDashboard)
module.exports = router;

