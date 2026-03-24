const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, vehiclenumber, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      phone,
      vehiclenumber,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
