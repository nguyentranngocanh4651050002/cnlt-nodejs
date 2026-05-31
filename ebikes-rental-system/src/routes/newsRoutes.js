const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Quản lý tin tức bài viết: /api/news
router.route('/')
    .get(newsController.getAllNews)
    .post(newsController.createNews);

module.exports = router;