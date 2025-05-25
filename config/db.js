require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected");
  } catch (err) {
    console.log("Error Connect to db", err);
    process.exit(1);
  }
};

module.exports = connectDB;
