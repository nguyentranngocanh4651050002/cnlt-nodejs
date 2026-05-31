const Bike = require('../models/bikeModel');

// 1. LẤY TOÀN BỘ DANH SÁCH XE (Cho Khách hàng & Admin xem)
exports.getAllBikes = async (req, res) => {
    try {
        // Dùng populate để kéo thêm thông tin chi tiết của danh mục xe ra nếu cần
        const danhSachXe = await Bike.find().populate('id_danh_muc', 'ten_danh_muc');
        res.status(200).json({ success: true, data: danhSachXe });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. THÊM XE MỚI VÀO HỆ THỐNG (Quyền Admin/Staff)
exports.createBike = async (req, res) => {
    try {
        const { ten_xe, id_danh_muc, bien_so_xe, gia_thue_theo_ngay, duong_dan_anh, mo_ta_chi_tiet } = req.body;

        // Kiểm tra trùng biển số xe
        const xeTonTai = await Bike.findOne({ bien_so_xe });
        if (xeTonTai) {
            return res.status(400).json({ success: false, message: "Biển số xe này đã tồn tại trên hệ thống!" });
        }

        const xeMoi = new Bike({
            ten_xe, id_danh_muc, bien_so_xe, gia_thue_theo_ngay, duong_dan_anh, mo_ta_chi_tiet
        });

        await xeMoi.save();
        res.status(201).json({ success: true, message: "Thêm xe vào kho thành công!", data: xeMoi });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. CẬP NHẬT THÔNG TIN XE HOẶC TRẠNG THÁI XE
exports.updateBike = async (req, res) => {
    try {
        const { id } = req.params;
        const xeCapNhat = await Bike.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!xeCapNhat) {
            return res.status(404).json({ success: false, message: "Không tìm thấy xe yêu cầu!" });
        }
        res.status(200).json({ success: true, message: "Cập nhật dữ liệu xe thành công!", data: xeCapNhat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. XÓA XE KHỎI HỆ THỐNG
exports.deleteBike = async (req, res) => {
    try {
        const { id } = req.params;
        const xeXoa = await Bike.findByIdAndDelete(id);
        if (!xeXoa) {
            return res.status(404).json({ success: false, message: "Không tìm thấy xe cần xóa!" });
        }
        res.status(200).json({ success: true, message: "Đã xóa xe khỏi hệ thống thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};