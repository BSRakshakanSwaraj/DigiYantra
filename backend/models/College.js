// models/College.js

const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: String,
  collegeCode: String, // like ABC123
});

module.exports = mongoose.model("College", collegeSchema);