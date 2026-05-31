const User = require('../models/userModel');
// Lưu ý: Nếu bạn chưa cài bcrypt để băm mật khẩu, hãy chạy lệnh: npm i bcrypt
const bcrypt = require('bcrypt'); 

// ĐĂNG KÝ TÀI KHOẢN
exports.register = async (req, res) => {
    try {
        const { ho_ten, email, mat_khau, so_dien_thoai } = req.body;

        // Kiểm tra xem email đã tồn tại chưa
        const userTonTai = await User.findOne({ email });
        if (userTonTai) {
            return res.status(400).json({ success: false, message: "Email này đã được đăng ký hệ thống!" });
        }

        // Mã hóa băm bảo mật mật khẩu
        const muoi = await bcrypt.genSalt(10);
        const matKhauMaHoa = await bcrypt.hash(mat_khau, muoi);

        // Tạo người dùng mới
        const userMoi = new User({
            ho_ten,
            email,
            mat_khau: matKhauMaHoa,
            so_dien_thoai,
            vai_tro: 'customer' // Mặc định đăng ký từ giao diện là khách hàng
        });

        await userMoi.save();
        res.status(201).json({ success: true, message: "Đăng ký tài khoản thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ĐĂNG NHẬP HỆ THỐNG
exports.login = async (req, res) => {
    try {
        const { email, mat_khau } = req.body;

        // Tìm kiếm tài khoản qua email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Tài khoản không tồn tại trên hệ thống!" });
        }

        // Kiểm tra trạng thái hoạt động
        if (!user.trang_thai_hoat_dong) {
            return res.status(403).json({ success: false, message: "Tài khoản của bạn hiện đang bị khóa!" });
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã băm trong DB
        const hopLe = await bcrypt.compare(mat_khau, user.mat_khau);
        if (!hopLe) {
            return res.status(400).json({ success: false, message: "Mật khẩu nhập vào không chính xác!" });
        }

        res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            user: {
                id: user._id,
                ho_ten: user.ho_ten,
                email: user.email,
                vai_tro: user.vai_tro
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};