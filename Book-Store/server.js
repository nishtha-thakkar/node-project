const express = require("express");
const app = express();
app.use(express.json())

const dotenv = require("dotenv");
const { connectDataBase } = require("./src/db/db");
const userRoutes = require("./src/routes/userRoutes")


dotenv.config();

connectDataBase();

app.use("/api/Book", userRoutes);

app.listen(process.env.PORT, (req ,res) => {
    console.log(`server is working : ${process.env.PORT}`)
})