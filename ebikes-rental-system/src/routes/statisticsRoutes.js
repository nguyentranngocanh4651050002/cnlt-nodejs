const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

// Lấy số liệu tổng hợp cho trang chủ quản trị: /api/statistics/dashboard
router.get('/dashboard', statisticsController.getAdminDashboardStats);

module.exports = router;