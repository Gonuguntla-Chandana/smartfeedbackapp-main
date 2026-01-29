const express = require("express");
const router = express.Router();
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Feedback = require("../models/Feedback");
const User = require("../models/User");
const adminAuth = require("../middleware/adminAuth");

/* =========================
   USER REGISTER
========================= */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   LOGIN (USER + ADMIN)
========================= */
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // Normalize input
    email = email.trim().toLowerCase();
    password = password.trim();

    console.log("Login attempt:", email);

    /* ===== ADMIN LOGIN ===== */
    if (
      email === process.env.ADMIN_EMAIL.toLowerCase().trim()
    ) {
      console.log("Admin email matched");

      if (password !== process.env.ADMIN_PASSWORD.trim()) {
        console.log("Admin password wrong");
        return res.status(401).json({ message: "Invalid admin credentials" });
      }

      const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log("Admin login success");
      return res.json({ role: "admin", token });
    }

    /* ===== USER LOGIN ===== */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid login" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid login" });
    }

    res.json({
      role: "user",
      username: user.username,
      user_id: user._id
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   SUBMIT FEEDBACK
========================= */
router.post("/feedback", async (req, res) => {
  try {
    const { message, user_id, username } = req.body;

    const result = sentiment.analyze(message);
    const sentimentLabel =
      result.score > 0
        ? "Positive"
        : result.score < 0
        ? "Negative"
        : "Neutral";

    const fb = new Feedback({
      user_id,
      username,
      message,
      sentiment: sentimentLabel
    });

    await fb.save();
    res.json({ sentiment: sentimentLabel });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   ADMIN: ALL FEEDBACK
========================= */
router.get("/admin/feedbacks", adminAuth, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   ADMIN: SENTIMENT SUMMARY
========================= */
router.get("/summary", adminAuth, async (req, res) => {
  try {
    const all = await Feedback.find();
    const summary = { Positive: 0, Negative: 0, Neutral: 0 };

    all.forEach(f => summary[f.sentiment]++);
    res.json(summary);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
