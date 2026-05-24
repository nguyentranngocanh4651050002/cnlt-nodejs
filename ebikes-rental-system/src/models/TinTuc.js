// ===============================
// src/models/TinTuc.js
// ===============================

const mongoose = require("mongoose");

const tinTucSchema = new mongoose.Schema(
{
    tieuDe: {
        type: String,
        required: true
    },

    noiDung: {
        type: String,
        required: true
    },

    hinhAnh: {
        type: String
    },

    tacGia: {
        type: String
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("TinTuc", tinTucSchema);