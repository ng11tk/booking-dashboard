// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ng11tk:TestMongo123@namastenode.qpvbswo.mongodb.net/booking-dashboard"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
