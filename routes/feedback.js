const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Feedback schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// POST route to save feedback
router.post("/feedback", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

    res.status(201).json({ success: true, message: "Feedback saved successfully!" });
  } catch (err) {
    console.error("Feedback saving error:", err.message);
    res.status(500).json({ success: false, message: "Failed to save feedback." });
  }
});

// (Optional) GET route to view all feedbacks (e.g., for admin panel)
router.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error("Fetching feedbacks error:", err.message);
    res.status(500).json({ message: "Failed to fetch feedbacks." });
  }
});

module.exports = router;
