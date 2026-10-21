const express = require("express")
const dotenv = require("dotenv");
const { connectedDatabase } = require("./src/db/db");
const app = express();
dotenv.config();
const userRoutes = require("./src/routes/userRoutes"); 
const blogRoutes = require("./src/routes/blogRoutes")
const cookieParse = require("cookie-parser")


app.use(express.json());
app.use(cookieParse())

connectedDatabase();
app.use("/blog/login" , userRoutes)
app.use("/blog", blogRoutes);

app.listen(process.env.PORT , () => {
    console.log(`server is working on port ${process.env.PORT}`)
})

