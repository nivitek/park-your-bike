import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  slot: { type: Number, required: true },
  dates: { type: [String], required: true },
  user: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
