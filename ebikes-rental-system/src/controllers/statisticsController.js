const Rental = require('../models/rentalModel');
const Payment = require('../models/paymentModel');
const Bike = require('../models/bikeModel');

// TỔNG HỢP SỐ LIỆU CHO MÀN HÌNH DASHBOARD ADMIN
exports.getAdminDashboardStats = async (req, res) => {
    try {
        // 1. Thống kê tổng số lượng xe máy trong kho
        const tongSoXe = await Bike.countDocuments();

        // 2. Thống kê tổng số đơn đặt thuê xe
        const tongSoDonThue = await Rental.countDocuments();

        // 3. Tính tổng doanh thu từ tất cả các hóa đơn thanh toán thành công
        const tinhDoanhThu = await Payment.aggregate([
            { $match: { trang_thai_giao_dich: 'paid' } },
            { $group: { _id: null, tong_tien: { $sum: '$so_tien_thanh_toan' } } }
        ]);
        
        const tongDoanhThu = tinhDoanhThu.length > 0 ? tinhDoanhThu[0].tong_tien : 0;

        res.status(200).json({
            success: true,
            data: {
                so_luong_xe: tongSoXe,
                so_luong_don: tongSoDonThue,
                doanh_thu: tongDoanhThu
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};