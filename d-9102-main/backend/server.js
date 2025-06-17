require('dotenv').config();
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
const userRoutes = require("./routes/userRoutes");
const assistanceRoutes = require("./routes/assistanceRoutes");
const profileRoutes = require("./routes/profile");

// ✅ Use local MongoDB


// ✅ Import LocationModel (fixing missing reference)


const app = express();

// ✅ CORS: Allow frontend to communicate with backend
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ 
  origin: CLIENT_URL, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// ✅ Additional headers for auth
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CLIENT_URL);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  next();
});

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

const store = MongoStore.create({
  mongoUrl:process.env.MONGO_URI ,
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
    secure: false, // Set to false for HTTP development
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax' // Changed from 'none' for HTTP development
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
app.use("/api", profileRoutes);

app.post("/api/location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    await LocationModel.create({ latitude, longitude });
    res.status(201).json({ message: "Location saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving location:", error);
    res.status(500).json({ error: "Failed to save location" });
  }
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(()=>console.log("🔗 Mongo URI:", process.env.MONGO_URI))
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

mongoose.connection.on('error', err => {
  console.error('❌ MongoDB Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB Disconnected');
});

const PORT = process.env.PORT || 8000;

// Handle server startup with error handling
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Please try a different port or kill the process using this port.`);
      process.exit(1);
    } else {
      console.error('❌ Server error:', error);
      process.exit(1);
    }
  }
};

startServer();
