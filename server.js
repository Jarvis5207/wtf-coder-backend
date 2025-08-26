const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const feedbackRoutes = require("./routes/feedback");

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://wtf-coders.netlify.app", // frontend domain
  credentials: true
}));

app.use(express.json());

// ✅ Health check route for Railway / monitoring
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", time: new Date() });
});

// ✅ MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ✅ API routes
app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
