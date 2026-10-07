const express = require("express");
const dotenv = require("dotenv");
const { connectDatabase } = require("./src/db/db");
const router = require("./src/router/router");

dotenv.config();

const app = express();

// ફક્ત એક જ વાર અને રૂટ્સની ઉપર જ હોવું જોઈએ
app.use(express.json());

connectDatabase();

app.use("/api/blog", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port : ${process.env.PORT}`);
});