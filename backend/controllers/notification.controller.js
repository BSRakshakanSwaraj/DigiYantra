const Notification = require("../models/Notification");

exports.getMyNotifications = async (req, res) => {

  try {

    const notifications = await Notification.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }

};


exports.markAllRead = async (req, res) => {

  await Notification.updateMany(
    { user: req.user.id },
    { read: true }
  );

  res.json({ message: "All notifications marked read" });

};