const ActivityLog = require('../models/ActivityLog');

// GHI LẠI NHẬT KÝ HỆ THỐNG
exports.logActivity = async (req, res) => {
    try {
        const { nguoi_thuc_hien, vai_tro, hanh_dong, chi_tiet_hanh_dong } = req.body;
        const logMoi = new ActivityLog({
            nguoi_thuc_hien,
            vai_tro,
            hanh_dong,
            chi_tiet_hanh_dong,
            dia_chi_ip: req.ip || '127.0.0.1'
        });
        await logMoi.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// TẢI NHẬT KÝ RA TRANG DASHBOARD ADMIN
exports.getSystemLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ thoi_gian_thao_tac: -1 }).limit(100); // Lấy 100 log mới nhất
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};