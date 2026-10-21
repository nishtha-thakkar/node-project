const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

exports.connectedDatabase = async() => {
    try{

        await mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("successfully to connect db"))
        .catch(() => console.log("errorto connect db"))


    }catch(error){
        console.log("error" , error)

    }
}