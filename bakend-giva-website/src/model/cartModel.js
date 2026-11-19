const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  // to save user id in mongodb
        ref:"User",
        required:true,
        unique:true

    },

    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId, // to save product id in mongodb
                // objectid = special data type of mongodb to identify uset with it's id
                ref:"Product",
                required:true
            },

            quantity:{
                type:Number,  // to keep product quantity
                default:1,
                min:1
            }
        }
    ]
},
{timestamps: true}

)

module.exports = mongoose.model("Cart", cartSchema);