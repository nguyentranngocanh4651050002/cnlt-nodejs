const NguoiDung = require("../models/NguoiDung");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, matKhau } = req.body;

    // check input
    if (!email || !matKhau) {
      return res.status(400).json({
        success: false,
        message: "Thiếu email hoặc mật khẩu"
      });
    }

    // tìm user
    const user = await NguoiDung.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email không tồn tại"
      });
    }

    // check password
    const isMatch = await bcrypt.compare(matKhau, user.matKhau);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Sai mật khẩu"
      });
    }

    // tạo token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    // debug (optional)
    console.log("🔥 LOGIN SUCCESS");
    console.log("TOKEN:", token);

    // trả response
    return res.json({
      success: true,
      message: "Login OK",
      token: token,
      user: {
        id: user._id,
        hoTen: user.hoTen,
        email: user.email
      }
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { login };