const express = require("express");
const dotenv = require("dotenv");
const cookieParse = require("cookie-parser")

dotenv.config();

const { connectDataBase } = require("./src/db/db");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes")
const cartRoutes = require("./src/routes/cartRoutes")
const orderRoutes = require("./src/routes/orderRoutes")


const app = express();


app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Server is working");
});
app.use(cookieParse());

app.use("/giva/website", authRoutes);
app.use("/giva/website/product" , productRoutes)
app.use("/giva/website/cart" , cartRoutes)
app.use("/giva/website/order" , orderRoutes)


const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // 1. Force the database to connect first
    console.log("Connecting to database...");
    await connectDataBase();
    console.log("Database connected successfully.");

    // 2. Start the HTTP server only if DB connection succeeds
    const server = app.listen(PORT, () => {
      console.log(`HTTP server is listening at http://127.0.0.1:${PORT}`);
    });

    server.on("error", (error) => {
      console.error("HTTP server error:", error);
    });

  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1); // Stop the process so you can fix the issue immediately
  }
};

startServer();
