const News = require('../models/newsModel');

// LẤY DANH SÁCH BÀI VIẾT TIN TỨC
exports.getAllNews = async (req, res) => {
    try {
        const tinTuc = await News.find().sort({ ngay_dang: -1 }); // Tin mới nhất lên đầu
        res.status(200).json({ success: true, data: tinTuc });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ĐĂNG BÀI VIẾT MỚI (Admin)
exports.createNews = async (req, res) => {
    try {
        const { tieu_de, tom_tat, noi_dung_chi_tiet, anh_dai_dien, nguoi_dang } = req.body;
        const baiViếtMoi = new News({ tieu_de, tom_tat, noi_dung_chi_tiet, anh_dai_dien, nguoi_dang });
        await baiViếtMoi.save();
        res.status(201).json({ success: true, message: "Đăng bài viết tin tức thành công!", data: baiViếtMoi });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};