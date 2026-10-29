const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();
const Admin = require("../models/isAdmin")

exports.isAuthenticated = async(req , res ,  next) => {

    try{
        const token = req.cookies?.token; // user na browswe raheli cookie mathi tokem melavavo

        if(!token){
            return res.status(401).json({
                success:false,
                message : "user not Authenticated"})
        }

        const decode = jwt.verify(token , process.env.SECREAT_KEY) // token ni signature , token expire - check kre che

        const user =await Admin.findById(decode.id).select("-password")

        if(!user){
            return res.status(401).json({
                success:false,
                message : "user not authenticated"})
        }

        req.user = user;  // mongodb mathi melveli mahiti req.user marakhiye chiye
        next();  // middleware nu work complete thayu hve agad controller ne req moklo


}catch(error){
        console.log("Error" , error)
        return res.status(401).json({
            success:false,
            message : "Invalid or expired token"})

    }

}