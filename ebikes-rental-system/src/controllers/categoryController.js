const Category = require('../models/categoryModel');

// LẤY DANH SÁCH DANH MỤC LOẠI XE
exports.getAllCategories = async (req, res) => {
    try {
        const danhMuc = await Category.find();
        res.status(200).json({ success: true, data: danhMuc });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// THÊM DANH MỤC MỚI (Ví dụ: Thêm loại 'Xe máy điện')
exports.createCategory = async (req, res) => {
    try {
        const { ten_danh_muc, mo_ta_danh_muc } = req.body;
        const danhMucMoi = new Category({ ten_danh_muc, mo_ta_danh_muc });
        await danhMucMoi.save();
        res.status(201).json({ success: true, message: "Thêm danh mục xe mới thành công!", data: danhMucMoi });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};