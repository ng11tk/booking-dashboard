// models/Batch.js
import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  trekId: mongoose.Schema.Types.ObjectId,
  startDate: Date,
  capacity: Number,
  bookedSeats: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["OPEN", "FULL", "ONGOING", "COMPLETED"],
    default: "OPEN",
  },
});

export default mongoose.model("Batch", batchSchema);
