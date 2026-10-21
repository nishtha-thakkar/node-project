const mongoose = require("mongoose")

const blogShema = new mongoose.Schema({
    title: {
        type : String ,
        required : [true , "title is required"]

    },

    author: {
        type : String , 
        required : [true , "author name is required"]
    },

     content: {
            type: String,
            required: [true , "content is required"]
        }
},
{timestamps : true}
)

const Blog = mongoose.model ("Blog" , blogShema)

module.exports = Blog;