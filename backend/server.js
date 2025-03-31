require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const path = require('path');
require("./config/passport"); 
const MongoStore = require('connect-mongo');

const authRoutes = require("./routes/auth");  
const protectedRoutes = require("./routes/protected");
const onboardingRoutes = require("./routes/onboarding");
const vehicleRoutes = require("./routes/vehicle");
 const userRoutes = require("./routes/user"); 
const assistanceRoutes = require("./routes/assistanceRoutes");
const app = express();

// ✅ CORS: Allow frontend to communicate with backend
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({ 
  origin: CLIENT_URL, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
  ttl: 24 * 60 * 60,
  crypto: {
    secret: process.env.SESSION_SECRET
  }
});
store.on('error', function(error) {
  console.error('❌ Session Store Error:', error);
});
const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Enable for HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none' // Required for cross-site requests
  },
  name: 'sessionId',
  rolling: true,
  unset: 'destroy',
  proxy: true
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/onboarding", onboardingRoutes);
app.use("/api", userRoutes); 
app.use("/api/vehicles", vehicleRoutes);

app.use("/api/assistance", assistanceRoutes);

app.post("/api/location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    await LocationModel.create({ latitude, longitude });
    res.status(201).json({ message: "Location saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save location" });
  }
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
})
.catch(err => {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1);
});

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', err => {
  console.error('❌ MongoDB Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB Disconnected');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
