const mongoose = require("mongoose");
// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
    },
    phone: {
      type: String,
      required: true,
    },
    vehiclenumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User; // Export the model
