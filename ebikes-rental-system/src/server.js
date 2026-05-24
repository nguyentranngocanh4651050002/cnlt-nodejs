const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Load biến môi trường
dotenv.config();

// Kết nối MongoDB
connectDB();

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// ROUTES
// =======================
const routes = require("./routes");
app.use("/api/v1", routes);

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
    res.json({
        message: "E-BIKES Backend Running 🚀",
        status: "OK"
    });
});

// =======================
// HANDLE 404 ERROR
// =======================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API không tồn tại"
    });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});