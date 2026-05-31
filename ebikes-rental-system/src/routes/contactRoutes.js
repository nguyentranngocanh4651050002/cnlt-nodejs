const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Gửi form liên hệ hoặc xem danh sách liên hệ: /api/contacts
router.route('/')
    .get(contactController.getAllContacts)
    .post(contactController.submitContactForm);

module.exports = router;