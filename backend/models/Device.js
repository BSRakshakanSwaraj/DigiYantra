const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({

  name: String,

  deviceId: String,

  qrCode: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // 🔥 IMPORTANT
  collegeId: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Device", deviceSchema);