const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();

exports.generateToken = (id ,res) => {
    const token = jwt.sign({id} , process.env.SECREAT_KEY, {
        expiresIn: process.env.EXPIRY_DATE,
    })

const option = {
    expires : new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly : true,
    secure:false
}

res.cookie("token" , token , option)
return token




}