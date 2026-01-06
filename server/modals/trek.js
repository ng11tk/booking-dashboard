// models/Trek.js
import mongoose from "mongoose";

const trekSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: String,
    durationDays: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Trek", trekSchema);
