const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();

exports.authMiddleware = (req , res , next) => {

    try{
        //get token from cookies

        const token = req.cookies?.token
        
        //check token exist

        if(!token){
            return res.status(401).json({message : "please login first"})
        }

        // verify token // token sacho che ke nai verify kre che

        const decode = jwt.verify(token , process.env.SECREAT_KEY);

        //save user id // login thayela user ni id rakhe che

        req.userId = decode.id;

        //move to next fun

        next();  // req ne agad controller sudhi mokle che




    }catch(error){
        console.log("error" , error)
        return res.status(401).json({message : "invalid or expired token"})

    }
}