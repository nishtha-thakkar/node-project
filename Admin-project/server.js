const express = require("express");
const dotenv = require("dotenv");
const { connectedDatabase } = require("./src/db/db");
const adminRoutes = require("./src/routes/adminRoutes")
const productRoutes = require("./src/routes/productRoutes")
const cookieParser = require("cookie-parser")



dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
connectedDatabase();

app.use("/admin/project" , adminRoutes )
app.use("/admin/product" , productRoutes)
app.listen(process.env.PORT , () => {
    console.log(`server is working on PORT ${process.env.PORT}` )
})

