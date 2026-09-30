const express = require("express")
const dotenv = require ("dotenv")
const {conectedDatabase}  = require("./src/db/db");
const router = require("./src/routes/routes");
dotenv.config();

const app = express();

app.use(express.json());

conectedDatabase();



app.use("/api/movie", router);


app.listen(process.env.PORT, () => {
    console.log(`server  is working ${process.env.PORT}`)
})