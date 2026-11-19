const  User = require("../model/user")

exports.adminMiddleware = async(req , res , next) => {

    try{

        const user = await User.findById(req.userId);

        if(!user){
            return res.status(401).json({message : "User not found"})
        }

        if(user.role !== "admin"){
            return res.status(403).json({message : "Access denied. Admin only"})
        }

        next();

    }catch(error){
        console.log("Error" , error)

        return res.status(500).json({message : "Admin verification Failed"})

    }

}