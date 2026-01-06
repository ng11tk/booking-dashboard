// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    travelerName: String,
    batchId: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "WAITLISTED", "CANCELLED"],
      default: "PENDING",
    },
    paymentStatus: {
      type: String,
      enum: ["NOT_PAID", "PARTIALLY_PAID", "PAID"],
      default: "NOT_PAID",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
