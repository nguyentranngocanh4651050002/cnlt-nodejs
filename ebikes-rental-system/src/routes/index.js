// ===============================
// src/routes/index.js
// ===============================

const express = require("express");

const router = express.Router();

// Import Routes
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const xeRoutes = require("./xeRoutes");
const donThueRoutes = require("./donThueRoutes");
const thanhToanRoutes = require("./thanhToanRoutes");
const danhGiaRoutes = require("./danhGiaRoutes");
const tinTucRoutes = require("./tinTucRoutes");

// API Routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/xe", xeRoutes);
router.use("/don-thue", donThueRoutes);
router.use("/thanh-toan", thanhToanRoutes);
router.use("/danh-gia", danhGiaRoutes);
router.use("/tin-tuc", tinTucRoutes);
router.use("/auth", require("./auth.routes"));
module.exports = router;