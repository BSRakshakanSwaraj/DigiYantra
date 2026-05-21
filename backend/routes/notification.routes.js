const router = require("express").Router();
const auth = require("../middleware/auth");

const notificationController = require("../controllers/notification.controller");

router.get("/", auth, notificationController.getMyNotifications);

router.put("/read", auth, notificationController.markAllRead);

module.exports = router;