const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');

// Lấy toàn bộ danh sách xe hoặc thêm xe mới
router.route('/')
    .get(bikeController.getAllBikes)
    .post(bikeController.createBike);

// Thao tác với một chiếc xe cụ thể qua ID
router.route('/:id')
    .put(bikeController.updateBike)
    .delete(bikeController.deleteBike);

module.exports = router;