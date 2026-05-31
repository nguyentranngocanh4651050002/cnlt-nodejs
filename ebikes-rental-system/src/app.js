// =====================================
// IMPORT PACKAGES
// =====================================
const express = require("express");
const cors = require("cors");

// =====================================
// IMPORT ROUTES CENTRALIZED
// =====================================
// Gộp sạch 11 file routes lẻ tẻ vào file index.js trung gian cho đúng chuẩn gọn gàng
const apiRoutes = require("./routes/index"); 

// =====================================
// CREATE APP
// =====================================
const app = express();

// =====================================
// MIDDLEWARE
// =====================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================
// ROOT API
// =====================================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        project: "E-BIKES Rental System",
        message: "API is running successfully"
    });
});

// =====================================
// SYSTEM ROUTES
// =====================================
// Quản lý toàn bộ endpoint bắt đầu bằng tiền tố /api
app.use("/api", apiRoutes);

// =====================================
// 404 NOT FOUND HANDLER
// =====================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found"
    });
});

// =====================================
// GLOBAL ERROR HANDLER
// =====================================
app.use((err, req, res, next) => {
    console.error("🔥 Hệ thống báo lỗi:", err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// =====================================
// EXPORT APP
// =====================================
module.exports = app;