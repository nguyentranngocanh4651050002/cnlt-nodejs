const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    ten_danh_muc: { type: String, required: true },
    mo_ta_danh_muc: { type: String }
}, {
    timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

module.exports = mongoose.model('Category', categorySchema, 'categories');