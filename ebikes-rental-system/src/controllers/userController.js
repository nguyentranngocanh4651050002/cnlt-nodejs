const User = require('../models/userModel');

// XEM TOÀN BỘ DANH SÁCH THÀNH VIÊN
exports.getAllUsers = async (req, res) => {
    try {
        const danhSachUser = await User.find().select('-mat_khau'); // Ẩn trường mật khẩu để bảo mật dữ liệu
        res.status(200).json({ success: true, data: danhSachUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// KHÓA HOẶC MỞ KHÓA TÀI KHOẢN THÀNH VIÊN
exports.toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { trang_thai_hoat_dong } = req.body; // truyền lên true hoặc false

        const user = await User.findByIdAndUpdate(id, { trang_thai_hoat_dong }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng!" });
        }
        res.status(200).json({ success: true, message: "Cập nhật trạng thái tài khoản thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};