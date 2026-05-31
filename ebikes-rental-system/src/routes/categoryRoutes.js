const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Đường dẫn: /api/categories
router.route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);

module.exports = router;