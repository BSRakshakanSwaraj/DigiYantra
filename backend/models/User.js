const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,

  email: String,

  password: String,

  role: {
    type: String,
    enum: [
      "superadmin",
      "admin",
      "user",
      "service"
    ]
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    default: null
  },

  isApproved: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model(
  "User",
  userSchema
);