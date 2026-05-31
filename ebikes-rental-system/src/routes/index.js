const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const bikeRoutes = require('./bikeRoutes');
const categoryRoutes = require('./categoryRoutes');
const rentalRoutes = require('./rentalRoutes');
const paymentRoutes = require('./paymentRoutes');
const reviewRoutes = require('./reviewRoutes');
const newsRoutes = require('./newsRoutes');
const contactRoutes = require('./contactRoutes');
const gpsRoutes = require('./gpsRoutes');
const statisticsRoutes = require('./statisticsRoutes');
const userRoutes = require('./userRoutes');

// Cấu hình tiền tố URL cho từng nhóm chức năng
router.use('/auth', authRoutes);
router.use('/bikes', bikeRoutes);
router.use('/categories', categoryRoutes);
router.use('/rentals', rentalRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/news', newsRoutes);
router.use('/contacts', contactRoutes);
router.use('/gps', gpsRoutes);
router.use('/statistics', statisticsRoutes);
router.use('/users', userRoutes);

module.exports = router;