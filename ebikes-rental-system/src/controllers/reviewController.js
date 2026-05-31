const Review = require('../models/reviewModel');

// 1. GỬI ĐÁNH GIÁ (Sau khi trả xe xong)
exports.createReview = async (req, res) => {
    try {
        const { id_khach_hang, id_xe, so_sao_danh_gia, noi_dung_binh_luan } = req.body;
        
        const danhGiaMoi = new Review({ id_khach_hang, id_xe, so_sao_danh_gia, noi_dung_binh_luan });
        await danhGiaMoi.save();
        
        res.status(201).json({ success: true, message: "Cảm ơn bạn đã gửi đánh giá dịch vụ!", data: danhGiaMoi });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. LẤY TOÀN BỘ ĐÁNH GIÁ CỦA MỘT CHIẾC XE MÁY (Hiển thị trang chi tiết xe)
const mongoose = require('mongoose');
exports.getBikeReviews = async (req, res) => {
    try {
        const { bikeId } = req.params;
        const danhSachReview = await Review.find({ id_xe: bikeId }).populate('id_khach_hang', 'ho_ten');
        res.status(200).json({ success: true, data: danhSachReview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};