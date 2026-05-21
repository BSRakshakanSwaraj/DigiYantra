const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const College = require("../models/College");


// ========================================
// ✅ SIGNUP
// ========================================
router.post("/signup", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
      collegeCode
    } = req.body;

    // ====================================
    // VALIDATION
    // ====================================
    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });

    }

    // ====================================
    // SUPERADMIN CANNOT SIGNUP
    // ====================================
    if (
      role.toLowerCase() ===
      "superadmin"
    ) {

      return res.status(403).json({
        success: false,
        message:
          "Super Admin cannot signup"
      });

    }

    // ====================================
    // COLLEGE REQUIRED
    // ====================================
    if (!collegeCode) {

      return res.status(400).json({
        success: false,
        message:
          "College code is required"
      });

    }

    // ====================================
    // FIND COLLEGE
    // ====================================
    const college =
      await College.findOne({
        collegeCode
      });

    if (!college) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid college code"
      });

    }

    // ====================================
    // CHECK EXISTING USER
    // ====================================
    const existingUser =
      await User.findOne({

        email,

        collegeId: college._id

      });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          "User already exists"
      });

    }

    // ====================================
    // CREATE USER
    // ====================================
    const user = await User.create({

      name,

      email,

      password,

      role: role.toLowerCase(),

      collegeId: college._id,

      isApproved: false

    });

    res.status(201).json({

      success: true,

      message:
        role.toLowerCase() ===
        "admin"

          ? "Admin account created successfully"

          : "Signup request sent. Wait for admin approval",

      user

    });

  } catch (error) {

    console.log(
      "SIGNUP ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Signup failed"

    });

  }

});


// ========================================
// ✅ LOGIN
// ========================================
router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
      collegeCode
    } = req.body;

    // ====================================
    // VALIDATION
    // ====================================
    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message:
          "Email and password required"
      });

    }

    let user;

    // ====================================
    // ✅ SUPERADMIN LOGIN
    // ====================================
    if (
      email ===
      "superadmin@digiyantra.com"
    ) {

      // ✅ HARDCODED SUPERADMIN
      if (
        password !==
        "chakrikannu1507"
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid Super Admin credentials"
        });

      }

      user = {

        _id: "superadmin123",

        name: "Super Admin",

        email:
          "superadmin@digiyantra.com",

        role: "superadmin"

      };

    }

    // ====================================
    // ✅ NORMAL LOGIN
    // ====================================
    else {

      // COLLEGE REQUIRED
      if (!collegeCode) {

        return res.status(400).json({
          success: false,
          message:
            "College code required"
        });

      }

      // FIND COLLEGE
      const college =
        await College.findOne({
          collegeCode
        });

      if (!college) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid college code"
        });

      }

      // FIND USER
      user = await User.findOne({

        email,

        password,

        collegeId: college._id

      });

      if (!user) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid email or password"
        });

      }

      // APPROVAL CHECK
      if (!user.isApproved) {

        return res.status(403).json({
          success: false,
          message:
            "Waiting for admin approval"
        });

      }

    }

    // ====================================
    // CREATE TOKEN
    // ====================================
    const token = jwt.sign({

      userId: user._id,

      role: user.role,

      collegeId:
        user.collegeId || null

    },

    "SECRET",

    {
      expiresIn: "7d"
    });

    // ====================================
    // RESPONSE
    // ====================================
    res.json({

      success: true,

      message:
        "Login successful",

      token,

      role: user.role,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        collegeId:
          user.collegeId || null

      }

    });

  } catch (error) {

    console.log(
      "LOGIN ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Login failed"

    });

  }

});

module.exports = router;