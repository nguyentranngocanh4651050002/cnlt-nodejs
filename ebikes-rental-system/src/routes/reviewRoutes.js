const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Gửi đánh giá chung: /api/reviews
router.post('/', reviewController.createReview);

// Lấy toàn bộ đánh giá của 1 xe cụ thể: /api/reviews/bike/:bikeId
router.get('/bike/:bikeId', reviewController.getBikeReviews);

module.exports = router;