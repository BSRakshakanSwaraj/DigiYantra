const router = require("express").Router();

const auth = require("../middleware/auth");

const College = require("../models/College");

const User = require("../models/User");


// ======================================================
// ✅ GET PENDING ADMINS
// ======================================================
router.get(
  "/pending-admins",
  auth,
  async (req, res) => {

    try {

      // CHECK SUPERADMIN
      if (
        req.user.role !== "superadmin"
      ) {

        return res.status(403).json({
          success: false,
          message: "Access denied"
        });

      }

      // FIND PENDING ADMINS
      const admins = await User.find({

        role: "admin",

        isApproved: false

      }).populate(
        "collegeId",
        "name collegeCode"
      );

      res.json({

        success: true,

        admins

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Error fetching pending admins"

      });

    }

  }
);


// ======================================================
// ✅ APPROVE ADMIN
// ======================================================
router.put(
  "/approve-admin/:id",
  auth,
  async (req, res) => {

    try {

      // CHECK SUPERADMIN
      if (
        req.user.role !== "superadmin"
      ) {

        return res.status(403).json({
          success: false,
          message: "Access denied"
        });

      }

      // FIND ADMIN
      const admin = await User.findById(
        req.params.id
      );

      if (!admin) {

        return res.status(404).json({
          success: false,
          message: "Admin not found"
        });

      }

      // APPROVE
      admin.isApproved = true;

      await admin.save();

      res.json({

        success: true,

        message:
          "Admin approved successfully"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Error approving admin"

      });

    }

  }
);


// ======================================================
// ✅ REJECT ADMIN
// ======================================================
router.delete(
  "/reject-admin/:id",
  auth,
  async (req, res) => {

    try {

      // CHECK SUPERADMIN
      if (
        req.user.role !== "superadmin"
      ) {

        return res.status(403).json({
          success: false,
          message: "Access denied"
        });

      }

      // DELETE ADMIN
      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({

        success: true,

        message: "Admin rejected"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: "Error rejecting admin"

      });

    }

  }
);


// ======================================================
// ✅ CREATE COLLEGE
// ======================================================
router.post(
  "/create-college",
  auth,
  async (req, res) => {

    try {

      // CHECK SUPERADMIN
      if (
        req.user.role !== "superadmin"
      ) {

        return res.status(403).json({
          success: false,
          message: "Access denied"
        });

      }

      const {

        name,

        collegeCode

      } = req.body;

      // VALIDATION
      if (
        !name ||
        !collegeCode
      ) {

        return res.status(400).json({

          success: false,

          message:
            "College name and code required"

        });

      }

      // CHECK EXISTING
      const existing =
        await College.findOne({

          collegeCode

        });

      if (existing) {

        return res.status(400).json({

          success: false,

          message:
            "College code already exists"

        });

      }

      // CREATE
      const college =
        await College.create({

          name,

          collegeCode

        });

      res.status(201).json({

        success: true,

        message:
          "College created successfully",

        college

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Error creating college"

      });

    }

  }
);


// ======================================================
// ✅ GET ALL COLLEGES
// ======================================================
router.get(
  "/colleges",
  auth,
  async (req, res) => {

    try {

      // CHECK SUPERADMIN
      if (
        req.user.role !== "superadmin"
      ) {

        return res.status(403).json({

          success: false,

          message: "Access denied"

        });

      }

      // FETCH COLLEGES
      const colleges =
        await College.find();

      res.json({

        success: true,

        colleges

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Error fetching colleges"

      });

    }

  }
);


// ======================================================
// ✅ DELETE COLLEGE
// ======================================================
router.delete(
  "/college/:id",
  auth,
  async (req, res) => {

    try {

      // CHECK SUPERADMIN
      if (
        req.user.role !== "superadmin"
      ) {

        return res.status(403).json({

          success: false,

          message: "Access denied"

        });

      }

      // DELETE COLLEGE
      await College.findByIdAndDelete(
        req.params.id
      );

      res.json({

        success: true,

        message:
          "College deleted successfully"

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Error deleting college"

      });

    }

  }
);

module.exports = router;