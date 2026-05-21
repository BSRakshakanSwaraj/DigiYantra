const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

  title: String,

  description: String,

  deviceId: String,

  deviceName: String,

  status: {
    type: String,
    default: "Pending",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // 🔥 IMPORTANT
  collegeId: {
    type: String,
    required: true
  },

  adminRemark: String,

  serviceRemark: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Complaint", complaintSchema);