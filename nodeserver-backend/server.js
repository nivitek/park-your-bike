const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bookingRoutes = require("./routes/bookingRoutes.js");
const Booking = require("./models/Booking.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_ConnString)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Routes
app.use("/api/users", userRoutes);
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/users/profile", async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied, no token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put("/api/users/profile", async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.userId || decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user details
    const { name, email, phone, vehiclenumber, password } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.vehiclenumber = vehiclenumber || user.vehiclenumber;

    // Hash the new password only if the user is updating it
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/api/bookings", async (req, res) => {
  try {
    const { slot, dates, user } = req.body;

    // Validate required fields
    if (!slot || !dates.length || !user) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user has already booked for any of the selected dates
    const existingBooking = await Booking.findOne({
      user,
      dates: { $in: dates }, // Checks if any selected date already exists
    });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "You have already booked a slot for one of the selected dates.",
      });
    }

    // Create new booking
    const newBooking = new Booking({ slot, dates, user });
    await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});
