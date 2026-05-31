require("dotenv").config();

// Gọi đúng file app.js nằm cùng thư mục src/
const app = require("./app"); 

// ĐỔI TÊN ĐƯỜNG DẪN: Gọi chính xác đến file database.js trong thư mục config/
const connectDB = require("./config/database"); 

// Kích hoạt kết nối đến MongoDB thông qua file database.js
connectDB();

const PORT = process.env.PORT || 5000;

// Khởi chạy lắng nghe cổng
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});