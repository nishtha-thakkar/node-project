const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true , "name is required"],
        trim : true  // user je input enter kre ene start and end ma space remove kre
    },

    email : {
        type:String,
        required: [true , "email is required"],
        unique : true,
        trim : true,
        
    },

    password : {
        type : String,
        required: [true , "password is required"]
    },

    role:{
        type:String,
        enum : ["user" , "admin"], // only put the value decided like only put the user and admin
        default : "user"
    },

    address:{
        type:String,
        default : "",
    },
},
{timestamps : true }
)

module.exports = mongoose.model("User" , userSchema);