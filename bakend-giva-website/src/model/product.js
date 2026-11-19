const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true , "name is required"]
    },

    price:{
        type:Number,
        required: [true , "price is required"]
    },

    description : {
        type:String
    },

    category:{
        type : String,
        required : [true , "category is required"]
    },

    image:{
        type : String,
        required:true
    },

    stock : {
        type : Number,
        default : 0
    },
},
{timestamps : true}
);

module.exports = mongoose.model("Product" , productSchema)