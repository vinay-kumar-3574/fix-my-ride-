const express = require("express");
const mongoose = require("mongoose");
const Onboarding = require("../models/Onboarding"); // Import the model
const User = require("../models/User"); // Import User model (assuming you have a user model)

const router = express.Router();

// ✅ Save onboarding details
router.post("/profile", async (req, res) => {
  try {
    const {
      userId,
      fullName,
      email,
      contactNumber,
      profilePicture,
      vehicleType,
      vehicleModel,
      licensePlate,
      location,
      latitude,
      longitude
    } = req.body;

    console.log("📥 Incoming Onboarding Data:", req.body); // Debugging

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user already has onboarding data
    const existingOnboarding = await Onboarding.findOne({ userId: userId });
    if (existingOnboarding) {
      // If onboarding data exists, update it
      existingOnboarding.fullName = fullName;
      existingOnboarding.email = email;
      existingOnboarding.contactNumber = contactNumber;
      existingOnboarding.profilePicture = profilePicture;
      existingOnboarding.vehicleType = vehicleType;
      existingOnboarding.vehicleModel = vehicleModel;
      existingOnboarding.licensePlate = licensePlate;
      existingOnboarding.location = location;
      existingOnboarding.latitude = latitude;
      existingOnboarding.longitude = longitude;s
      
      await existingOnboarding.save();
      console.log("✅ Onboarding data updated:", existingOnboarding);
      return res.status(200).json({ message: "Onboarding data updated successfully." });
    }

    // If no onboarding data exists, create a new onboarding entry
    const newOnboarding = new Onboarding({
      userId: userId,
      fullName: fullName,
      email: email,
      contactNumber: contactNumber,
      profilePicture: profilePicture,
      vehicleType: vehicleType,
      vehicleModel: vehicleModel,
      licensePlate: licensePlate,
      location: location,
      
    });

    await newOnboarding.save();
    console.log("✅ Onboarding data saved:", newOnboarding); // Debugging

    res.status(201).json({ message: "Onboarding data saved successfully." });
  } catch (error) {
    console.error("❌ Onboarding error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
