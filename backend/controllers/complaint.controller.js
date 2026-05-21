const Complaint = require("../models/Complaint");
const Device = require("../models/Device");
const Notification = require("../models/Notification");
const User = require("../models/User");

// ✅ Create Complaint
exports.createComplaint = async (req, res) => {

  try {

    const { title, description, deviceId } = req.body;

    let deviceName = "Manual";

    if (deviceId && deviceId !== "Manual") {

      const device = await Device.findOne({
        deviceId,
        collegeId: req.user.collegeId
      });

      if (device) {
        deviceName = device.name;
      }
    }

    const complaint = await Complaint.create({
      title,
      description,
      deviceId,
      deviceName,

      user: req.user.userId,

      // 🔥 IMPORTANT
      collegeId: req.user.collegeId,

      status: "Pending"
    });

    // 🔔 Notify only admins of same college
    const admins = await User.find({
      role: "admin",
      collegeId: req.user.collegeId
    });

    for (const admin of admins) {

      await Notification.create({
        user: admin._id,
        message: `New complaint created: ${title}`,
      });

    }

    res.status(201).json(complaint);

  } catch (error) {

    res.status(500).json({
      message: "Error creating complaint"
    });

  }
};

// ✅ Get Complaints
exports.getAllComplaints = async (req, res) => {

  try {

    let complaints;

    // USER
    if (req.user.role === "user") {

      complaints = await Complaint.find({
        user: req.user.userId,
        collegeId: req.user.collegeId
      }).populate("user", "name email");

    }

    // SERVICE
    else if (req.user.role === "service") {

      complaints = await Complaint.find({
        collegeId: req.user.collegeId,
        status: { $in: ["Approved", "In Progress"] }
      }).populate("user", "name email");

    }

    // ADMIN
    else if (req.user.role === "admin") {

      complaints = await Complaint.find({
        collegeId: req.user.collegeId
      }).populate("user", "name email");

    }

    res.json(complaints);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching complaints"
    });

  }
};

// ✅ Update Complaint Status
exports.updateComplaintStatus = async (req, res) => {

  try {

    const { status, remark } = req.body;

    const complaint = await Complaint.findOne({
      _id: req.params.id,

      // 🔥 SAME COLLEGE ONLY
      collegeId: req.user.collegeId
    });

    if (!complaint) {

      return res.status(404).json({
        message: "Complaint not found"
      });

    }

    // ADMIN
    if (req.user.role === "admin") {

      complaint.status = status;
      complaint.adminRemark = remark || "";

      if (status === "Approved") {

        await Notification.create({
          user: complaint.user,
          message: `Your complaint for device "${complaint.deviceName} (ID:${complaint.deviceId})" was approved`,
        });

      }

      if (status === "Rejected") {

        await Notification.create({
          user: complaint.user,
          message: `Your complaint for device "${complaint.deviceName} (ID:${complaint.deviceId})" was rejected`,
        });

      }
    }

    // SERVICE
    if (req.user.role === "service") {

      complaint.status = status;
      complaint.serviceRemark = remark || "";

      if (status === "In Progress") {

        await Notification.create({
          user: complaint.user,
          message: `Service started work on device "${complaint.deviceName} (ID:${complaint.deviceId})"`,
        });

      }

      if (status === "Resolved") {

        await Notification.create({
          user: complaint.user,
          message: `Your complaint for device "${complaint.deviceName} (ID:${complaint.deviceId})" has been resolved`,
        });

      }
    }

    await complaint.save();

    res.json(complaint);

  } catch (error) {

    res.status(500).json({
      message: "Error updating complaint"
    });

  }
};

// ✅ Device History
exports.getDeviceHistory = async (req, res) => {

  try {

    const complaints = await Complaint.find({
      deviceId: req.params.deviceId,

      // 🔥 SAME COLLEGE ONLY
      collegeId: req.user.collegeId

    }).populate("user", "name");

    res.json(complaints);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching device history"
    });

  }
};