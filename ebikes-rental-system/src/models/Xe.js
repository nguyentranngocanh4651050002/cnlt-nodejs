// ===============================
// src/models/Xe.js
// ===============================

const mongoose = require("mongoose");

const xeSchema = new mongoose.Schema(
{
    tenXe: {
        type: String,
        required: true
    },

    giaThue: {
        type: Number,
        required: true
    },

    trangThai: {
        type: String,
        default: "Có sẵn"
    },

    bienSo: {
        type: String
    },

    moTa: {
        type: String
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Xe", xeSchema);