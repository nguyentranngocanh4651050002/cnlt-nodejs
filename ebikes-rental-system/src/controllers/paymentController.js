const Payment = require('../models/paymentModel');
const Rental = require('../models/rentalModel');

// 1. TẠO HÓA ĐƠN THANH TOÁN (Khách thanh toán hoặc Staff thu tiền)
exports.createPayment = async (req, res) => {
    try {
        const { id_don_thue, so_tien_thanh_toan, phuong_thuc_thanh_toan, ma_giao_dich_ngan_hang } = req.body;

        const hoaDonMoi = new Payment({
            id_don_thue,
            so_tien_thanh_toan,
            phuong_thuc_thanh_toan,
            ma_giao_dich_ngan_hang,
            trang_thai_giao_dich: 'paid' // Mặc định chuyển khoản thành công hoặc tiền mặt đủ
        });
        await hoaDonMoi.save();

        // Cập nhật trạng thái tiền bạc bên đơn đặt xe (rentals) thành 'paid' (Đã thanh toán)
        await Rental.findByIdAndUpdate(id_don_thue, { trang_thai_thanh_toan: 'paid' });

        res.status(210).json({ success: true, message: "Thanh toán hóa đơn hoàn tất!", data: hoaDonMoi });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. XEM LỊCH SỬ DOANH THU HÓA ĐƠN (Quyền Admin)
exports.getAllPayments = async (req, res) => {
    try {
        const danhSachHoaDon = await Payment.find().populate({
            path: 'id_don_thue',
            populate: { path: 'id_khach_hang', select: 'ho_ten email' } // Lấy luôn tên khách thuê
        });
        res.status(200).json({ success: true, data: danhSachHoaDon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};