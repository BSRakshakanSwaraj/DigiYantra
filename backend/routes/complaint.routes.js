const router = require("express").Router();

const auth = require("../middleware/auth");

const complaintController = require("../controllers/complaint.controller");

// Create complaint
router.post(
  "/",
  auth,
  complaintController.createComplaint
);

// Get complaints
router.get(
  "/",
  auth,
  complaintController.getAllComplaints
);

// Update complaint status
router.put(
  "/:id",
  auth,
  complaintController.updateComplaintStatus
);

// Get complaint history by device
router.get(
  "/device/:deviceId",
  auth,
  complaintController.getDeviceHistory
);

module.exports = router;