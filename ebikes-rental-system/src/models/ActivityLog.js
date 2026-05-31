const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    nguoi_thuc_hien: { type: String, required: true },
    vai_tro: { type: String, required: true },
    hanh_dong: { type: String, required: true },
    chi_tiet_hanh_dong: { type: String },
    dia_chi_ip: { type: String }
}, {
    timestamps: { createdAt: 'thoi_gian_thao_tac' }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema, 'auditlogs');