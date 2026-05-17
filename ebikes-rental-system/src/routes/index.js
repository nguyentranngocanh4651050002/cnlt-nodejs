const express = require('express');
const router = express.Router();

// import routes
router.use('/auth', require('./auth.routes'));
router.use('/users', require('./user.routes'));
router.use('/bikes', require('./bike.routes'));
router.use('/rentals', require('./rental.routes'));

module.exports = router;