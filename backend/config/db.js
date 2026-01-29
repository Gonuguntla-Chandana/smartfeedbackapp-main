const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://gonuguntlachandana093_db_user:chandana2004@cluster0.lvbd8de.mongodb.net/?appName=Cluster0");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
