const Contact = require('../models/contactModel');

// KHÁCH GỬI LIÊN HỆ
exports.submitContactForm = async (req, res) => {
    try {
        const { ten_khach_hang, email, so_dien_thoai, tieu_de_gop_y, noi_dung_gop_y } = req.body;
        const contactMoi = new Contact({ ten_khach_hang, email, so_dien_thoai, tieu_de_gop_y, noi_dung_gop_y });
        await contactMoi.save();
        res.status(201).json({ success: true, message: "Gửi thông tin liên hệ thành công! Shop sẽ phản hồi sớm." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// XEM DANH SÁCH KHÁCH HÀNG LIÊN HỆ (Admin check)
exports.getAllContacts = async (req, res) => {
    try {
        const danhSachLienHe = await Contact.find();
        res.status(200).json({ success: true, data: danhSachLienHe });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};