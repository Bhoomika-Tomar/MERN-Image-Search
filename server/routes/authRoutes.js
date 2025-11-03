const express = require("express");
const passport = require("passport");
const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// -------------------- GOOGLE AUTH --------------------
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: CLIENT_URL + "/login" }),
  (req, res) => {
    // Successful login
    res.redirect(CLIENT_URL);
  }
);

// -------------------- GITHUB AUTH --------------------
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: CLIENT_URL + "/login" }),
  (req, res) => {
    // Successful login
    res.redirect(CLIENT_URL);
  }
);

// -------------------- LOGOUT --------------------
router.get("/logout", (req, res, next) => {
  // Passport 0.6+ requires callback
  req.logout((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

// -------------------- CHECK USER SESSION --------------------
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
