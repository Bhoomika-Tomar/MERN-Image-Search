require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

// -------------------- MONGODB CONNECTION --------------------
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Error:", err.message));

// -------------------- MIDDLEWARES --------------------
app.use(express.json());
app.use(cookieParser());

// Enable CORS with credentials
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // allows cookies across origins
  })
);

// -------------------- EXPRESS SESSION --------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard_cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true only if using HTTPS
      httpOnly: true, // prevent JS access to cookies
      sameSite: "lax", // allows localhost cross-domain cookie sharing
      maxAge: 24 * 60 * 60 * 1000, // 1 day session
    },
  })
);

// -------------------- PASSPORT CONFIG --------------------
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// -------------------- ROUTES --------------------
app.use("/auth", authRoutes);
app.use("/api", searchRoutes);

// -------------------- HEALTH CHECK --------------------
app.get("/", (req, res) => res.json({ ok: true }));

// -------------------- ERROR HANDLING --------------------
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

module.exports = app;
