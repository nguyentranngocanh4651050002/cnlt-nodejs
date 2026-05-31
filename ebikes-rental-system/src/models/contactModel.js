const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    ten_khach_hang: { type: String, required: true },
    email: { type: String, required: true },
    so_dien_thoai: { type: String },
    tieu_de_gop_y: { type: String, required: true },
    noi_dung_gop_y: { type: String, required: true },
    trang_thai_xu_ly: { type: String, default: 'Chưa xử lý' }
}, {
    timestamps: { createdAt: 'ngay_gui' }
});

module.exports = mongoose.model('Contact', contactSchema, 'contacts');