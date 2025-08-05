const express = require("express");
const jwt = require("jsonwebtoken");
const Project = require("../models/Project");
const router = express.Router();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.post("/projects", authMiddleware, async (req, res) => {
  const { name } = req.body;
  const project = new Project({ userId: req.user.id, name });
  await project.save();
  res.json(project);
});

router.get("/projects", authMiddleware, async (req, res) => {
  const projects = await Project.find({ userId: req.user.id });
  res.json(projects);
});

module.exports = router;
