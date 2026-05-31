const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ho_ten: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mat_khau: { type: String, required: true },
    so_dien_thoai: { type: String, required: true },
    vai_tro: { type: String, enum: ['admin', 'staff', 'customer'], default: 'customer' },
    trang_thai_hoat_dong: { type: Boolean, default: true }
}, {
    timestamps: { createdAt: 'ngay_tao', updatedAt: 'ngay_cap_nhat' }
});

module.exports = mongoose.model('User', userSchema, 'users');