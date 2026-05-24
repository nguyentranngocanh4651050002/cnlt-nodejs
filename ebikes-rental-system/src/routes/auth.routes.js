const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");

// ================= REGISTER (tạm)
router.post('/register', (req, res) => {
  const { email, matKhau, hoTen } = req.body;

  if (!email || !matKhau) {
    return res.status(400).json({
      success: false,
      message: 'Thiếu dữ liệu'
    });
  }

  return res.json({
    success: true,
    message: 'Đăng ký thành công',
    data: { email, hoTen }
  });
});

// ================= LOGIN (CÓ TOKEN)
router.post('/login', (req, res) => {
  const { email, matKhau } = req.body;

  if (email === 'a@gmail.com' && matKhau === '123456') {

    //  TOKEN
    const token = jwt.sign(
      {
        email: email
      },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      message: "Login OK",
      token: token   
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Sai thông tin'
  });
});

module.exports = router;