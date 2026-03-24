const express = require("express");
const Booking = require("../models/Booking.js");

const router = express.Router();

// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
});

// POST: Book a slot
// router.post("/", async (req, res) => {
//   const { name, phone, slot, dates } = req.body;

//   try {
//     // Check if user already has a booking
//     const existingBooking = await Booking.findOne({ phone });

//     if (existingBooking) {
//       return res.status(400).json({ error: "You have already booked a slot" });
//     }

//     const newBooking = new Booking({ name, phone, slot, dates });
//     await newBooking.save();
//     res.status(201).json({ message: "Booking confirmed!" });
//   } catch (error) {
//     res.status(500).json({ error: "Error booking slot" });
//   }
// });

module.exports = router;
