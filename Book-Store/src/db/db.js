const mongoose = require("mongoose")

exports.connectDataBase = async()=>{

    try{

        await mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected"))
        .catch(()=> console.log("Error to connect DB"))

    }catch(error){
        console.log("ERROR:" , error)

    }

}
"now next step is connect server.js"