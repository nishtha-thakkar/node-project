const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URL);

    console.log("Successfully connected to Atlas");
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
    throw error;
  }
};