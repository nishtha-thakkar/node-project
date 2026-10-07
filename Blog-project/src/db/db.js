const mongoose = require("mongoose")

const dotenv = require("dotenv")

dotenv.config();

exports.connectDatabase = async() => {

    try{

        await mongoose 

        .connect(process.env.MONGODB_URL)
        .then(() => console.log("Databse connected"))
        .catch(() => console.log("Error to connect DB"))

    }catch(error){

        console.log("Error" , error)

    }

}