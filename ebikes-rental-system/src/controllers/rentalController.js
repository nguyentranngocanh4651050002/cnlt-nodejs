const Rental = require('../models/rentalModel');
const Bike = require('../models/bikeModel');

// 1. KHÁCH HÀNG ĐẶT ĐƠN THUÊ XE
exports.createRental = async (req, res) => {
    try {
        const { id_khach_hang, id_xe, ngay_bat_dau, ngay_du_kien_tra, tong_tien_thue } = req.body;

        // Kiểm tra xem xe đó hiện tại có đang trống không (available)
        const xeCheck = await Bike.findById(id_xe);
        if (!xeCheck || xeCheck.trang_thai_xe !== 'available') {
            return res.status(400).json({ success: false, message: "Xe này hiện tại đã có khách thuê hoặc đang bảo trì!" });
        }

        // Tạo đơn đặt thuê trạng thái mặc định là 'pending' chờ Admin duyệt
        const donThueMoi = new Rental({
            id_khach_hang, id_xe, ngay_bat_dau, ngay_du_kien_tra, tong_tien_thue
        });
        await donThueMoi.save();

        res.status(201).json({ success: true, message: "Gửi yêu cầu đặt thuê xe thành công! Vui lòng chờ duyệt.", data: donThueMoi });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. ADMIN/STAFF DUYỆT ĐƠN ĐẶT XE (Chuyển sang trạng thái ongoing - đang đi xe)
exports.approveRental = async (req, res) => {
    try {
        const { id } = req.params; // ID của đơn thuê xe

        const donThue = await Rental.findById(id);
        if (!donThue) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đơn thuê này!" });
        }

        donThue.trang_thai_don = 'approved';
        await donThue.save();

        // Đồng thời cập nhật trạng thái xe sang 'rented' (đang đi) để người khác không đặt được nữa
        await Bike.findByIdAndUpdate(donThue.id_xe, { trang_thai_xe: 'rented' });

        res.status(200).json({ success: true, message: "Duyệt đơn thuê xe thành công! Xe đã được xuất kho." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};