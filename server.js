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
  origin: "https://wtf-coders.netlify.app", // your frontend domain
  credentials: true
}));

app.use(express.json());
app.use("/api", require("./routes/auth.js"));
app.use("/api", require("./routes/feedback.js"));
app.use("/api", require("./routes/projects.js"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
