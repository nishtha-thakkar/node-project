const mongoose = require("mongoose");


exports.conectedDatabase = async() => {

    try{

        await mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected"))
        .catch(() => console.log("Error to connect Dataabse"))

        
    }catch(error){
    console.log("ERROR" , error)

    }

}