// ===============================
// src/models/LichSuThaoTac.js
// ===============================

const mongoose = require("mongoose");

const lichSuSchema = new mongoose.Schema(
{
    nguoiThucHien: {
        type: String
    },

    hanhDong: {
        type: String
    },

    thoiGian: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("LichSuThaoTac", lichSuSchema);