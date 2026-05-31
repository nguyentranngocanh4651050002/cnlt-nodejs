const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Khách đặt đơn thuê xe: /api/rentals
router.post('/', rentalController.createRental);

// Admin duyệt đơn thuê xe (xuất kho): /api/rentals/:id/approve
router.put('/:id/approve', rentalController.approveRental);

module.exports = router;