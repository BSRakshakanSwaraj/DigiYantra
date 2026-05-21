const router = require("express").Router();

const deviceController = require("../controllers/device.controller");

const auth = require("../middleware/auth");

// Add new device
router.post(
  "/",
  auth,
  deviceController.addDevice
);

// Get logged-in college devices only
router.get(
  "/my-devices",
  auth,
  deviceController.getMyDevices
);

// Admin/HOD can see all devices of their college
router.get(
  "/all",
  auth,
  deviceController.getAllDevices
);

module.exports = router;