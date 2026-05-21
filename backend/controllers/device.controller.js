const Device = require("../models/Device");
const QRCode = require("qrcode");

// ✅ Add Device
exports.addDevice = async (req, res) => {

  try {

    const { name, deviceId } = req.body;

    const qrData = JSON.stringify({
      deviceId: deviceId,
    });

    const qrCode = await QRCode.toDataURL(qrData);

    const device = await Device.create({
      name,
      deviceId,
      qrCode,

      // Owner
      user: req.user.userId,

      // 🔥 IMPORTANT
      collegeId: req.user.collegeId,
    });

    res.status(201).json(device);

  } catch (error) {

    res.status(500).json({
      message: "Error adding device"
    });

  }
};

// ✅ Get My Devices
exports.getMyDevices = async (req, res) => {

  try {

    const devices = await Device.find({
      user: req.user.userId,

      // 🔥 VERY IMPORTANT
      collegeId: req.user.collegeId
    });

    res.json(devices);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching devices"
    });

  }
};

// ✅ Get All Devices (Admin/HOD)
exports.getAllDevices = async (req, res) => {

  try {

    const devices = await Device.find({

      // 🔥 ONLY SAME COLLEGE
      collegeId: req.user.collegeId

    }).populate("user", "name email");

    res.json(devices);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching all devices"
    });

  }
};