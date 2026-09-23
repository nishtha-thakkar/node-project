const express = require("express");
const {addbook, getbook, updatebook, deletebook, }   = require("../controller/controller");

const router = express.Router();


router.post("/addbook" ,  addbook)
router.get("/getbook" , getbook)
router.put("/updatebook" , updatebook)
router.delete("/deletebook" , deletebook )

module.exports = router;