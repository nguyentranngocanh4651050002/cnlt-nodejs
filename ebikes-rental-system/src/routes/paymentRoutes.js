const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Quản lý hóa đơn: /api/payments
router.route('/')
    .get(paymentController.getAllPayments)
    .post(paymentController.createPayment);

module.exports = router;