
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Auto-update profile
router.post("/auto-update-profile", async (req, res) => {
    const { email, ...updateData } = req.body;
    console.log("Updating user with email:", email);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: updateData },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error("Auto-update error:", error);
      res.status(500).json({ error: "Auto-update failed" });
    }
  });
  
module.exports = router;
