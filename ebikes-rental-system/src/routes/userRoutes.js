const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Admin xem danh sách tài khoản: /api/users
router.get('/', userController.getAllUsers);

// Admin khóa/mở tài khoản: /api/users/:id/toggle
router.put('/:id/toggle', userController.toggleUserStatus);

module.exports = router;