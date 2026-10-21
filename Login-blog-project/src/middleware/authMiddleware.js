const jwt = require("jsonwebtoken")
const User = require("../model/user")
const dotenv = require("dotenv")
dotenv.config()

exports.isAuthenticated = async( req , res , next) => {

    try{
        const token = req.cookies?.token;

        if(!token){
            return res.status(401).json({
            success : false,    
            message : "user not authenticated"})
        }

        const decode = jwt.verify(token , process.env.SECREAT_KEY)

        const user = await User.findById(decode.id).select("-password")

        if(!user){
            return res.status(401).json({
            success :false,
            message : "user not authenticated"
            })
        }
        req.user = user;
        next();

    }catch(error){
        console.log("Error" , error)
        return res.status(401).json({
            success : true,
            message : "Invalid or expired token"})

    }

}