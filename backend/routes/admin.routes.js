const router = require("express").Router();

const User = require("../models/User");

const auth = require("../middleware/auth");


// =====================================
// ✅ GET PENDING USERS
// =====================================
router.get("/pending-users", auth, async (req, res) => {

  try {

    // ONLY ADMIN
    if (req.user.role !== "admin") {

      return res.status(403).json({
        message: "Access denied"
      });

    }

    const users = await User.find({

      collegeId: req.user.collegeId,

      isApproved: false,

role: {
  $in: ["user", "faculty", "service"]
}

    }).select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching users"
    });

  }

});


// =====================================
// ✅ APPROVE USER
// =====================================
router.put("/approve-user/:id", auth, async (req, res) => {

  try {

    // ONLY ADMIN
    if (req.user.role !== "admin") {

      return res.status(403).json({
        message: "Access denied"
      });

    }

    const user = await User.findOne({

      _id: req.params.id,

      collegeId: req.user.collegeId

    });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    user.isApproved = true;

    await user.save();

    res.json({
      message: "User approved successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error approving user"
    });

  }

});


// =====================================
// ❌ REJECT USER
// =====================================
router.delete("/reject-user/:id", auth, async (req, res) => {

  try {

    // ONLY ADMIN
    if (req.user.role !== "admin") {

      return res.status(403).json({
        message: "Access denied"
      });

    }

    const user = await User.findOne({

      _id: req.params.id,

      collegeId: req.user.collegeId

    });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    await user.deleteOne();

    res.json({
      message: "User rejected and removed"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error rejecting user"
    });

  }

});

module.exports = router;