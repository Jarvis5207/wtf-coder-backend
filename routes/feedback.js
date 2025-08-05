const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();

router.post("/feedback", async (req, res) => {
  const { name, email, rating, message } = req.body;
  const feedback = new Feedback({ name, email, rating, message });
  await feedback.save();
  res.json({ success: true });
});

module.exports = router;
