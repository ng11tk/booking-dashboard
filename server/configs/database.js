// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
