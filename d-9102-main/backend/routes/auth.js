const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User"); // Import User model

const router = express.Router();

// 🔹 Signup Route (Register New Users)
router.post("/signup", async (req, res) => {
  console.log("🔹 Signup Request Received - Headers:", req.headers);
  console.log("🔹 Signup Request Body:", req.body);
  
  const { name, email, password } = req.body;

  try {
      if (!name || !email || !password) {
          console.log("❌ Missing required fields:", { name, email, password: !!password });
          return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          console.log("❌ User already exists:", email);
          return res.status(400).json({ message: "User already exists. Please log in." });
      }

      // ✅ Ensure password is hashed before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
          name,
          email,
          password: hashedPassword
      });

      console.log("🔹 Attempting to save user:", { name, email });
      await newUser.save();
      console.log(" User saved successfully:", newUser);

      // Generate token and send user data
      const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      console.log(" JWT Token generated successfully");
      
      res.status(201).json({ 
          success: true,
          token, 
          user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email
          }
      });

  } catch (error) {
      console.error(" Signup error:", error);
      res.status(500).json({ 
          success: false,
          message: "Server error. Please try again later.",
          error: error.message 
      });
  }
});



// 🔹 Login Route (Authenticate Users)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: "User not found. Please sign up first." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
          return res.status(400).json({ message: "Incorrect password. Please try again." });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      console.log(" Login Successful, Sending User:", user); 
      res.json({ token, user });

  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
  }
});

  
 
  
 

// 🔹 Google OAuth Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 🔹 Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

// 🔹 Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => { 
    if (err) return res.status(500).json({ message: "Logout failed" });

    req.session.destroy(() => { // ✅ Destroy session
      res.clearCookie("connect.sid"); // ✅ Remove session cookie
      res.json({ message: "Logged out successfully" }); // ✅ Send success response
    });
  });
});
module.exports = router;
