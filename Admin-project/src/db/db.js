const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

exports.connectedDatabase = async() => {
    try{
        await mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("successfully to connect DB"))
        .catch(() => console.log("Error to connect to DB"))


    }catch(error){
        console.log("Error" , error)
    }
}