const express = require('express');
const router = express.Router();
const gpsController = require('../controllers/gpsController');

// Cập nhật tọa độ định vị từ xe gửi về: /api/gps
router.post('/', gpsController.updateGPS);

// Xem vị trí hiện tại của xe để vẽ lên bản đồ: /api/gps/bike/:bikeId
router.get('/bike/:bikeId', gpsController.getVehicleLocation);

module.exports = router;