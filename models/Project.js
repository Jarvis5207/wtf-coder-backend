const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  userId: String,
  name: String
});
module.exports = mongoose.model("Project", projectSchema);
