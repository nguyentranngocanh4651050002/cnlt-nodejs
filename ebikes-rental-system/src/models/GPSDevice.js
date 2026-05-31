const mongoose = require('mongoose');

const gpsSchema = new mongoose.Schema({
    id_xe: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
    kinh_do: { type: Number, required: true },
    vi_do: { type: Number, required: true },
    van_toc_hien_tai: { type: Number, default: 0 }
}, {
    timestamps: { updatedAt: 'cap_nhat_cuoi_cung' }
});

module.exports = mongoose.model('GPSDevice', gpsSchema, 'gpsmonitors');