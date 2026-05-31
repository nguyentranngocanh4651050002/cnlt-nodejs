const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    tieu_de: { type: String, required: true },
    tom_tat: { type: String },
    noi_dung_chi_tiet: { type: String, required: true },
    anh_dai_dien: { type: String },
    nguoi_dang: { type: String, default: 'Admin' }
}, {
    timestamps: { createdAt: 'ngay_dang' }
});

module.exports = mongoose.model('News', newsSchema, 'tintucs');