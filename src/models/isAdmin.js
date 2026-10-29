const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({

    name:{
        type : String,
        required:[true , "name is required"]
    },

    email:{
        type:String,
        required:[true , "email is required"],
        unique:true,
        lowercase:true,
        trim:true
    },

    password:{
        type:String,
        required:[true , "password is required"]
    },

    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"

    }


    
},
{timestamps: true}
);


module.exports = mongoose.model("Admin", adminSchema)