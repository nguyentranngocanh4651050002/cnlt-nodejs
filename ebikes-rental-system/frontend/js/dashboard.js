document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("statsTotalRevenue")) {
        loadDashboardStats();
    }
});

async function loadDashboardStats() {
    // Gọi đến API tổng hợp của backend
    const res = await apiFetch("/statistics/dashboard");
    
    if (res.success && res.data) {
        document.getElementById("statsTotalRevenue").innerText = `${res.data.tongDoanhThu ? res.data.tongDoanhThu.toLocaleString('vi-VN') : 0} đ`;
        document.getElementById("statsTotalBikes").innerText = `${res.data.tongSoXe || 0} xe`;
        document.getElementById("statsTotalRentals").innerText = `${res.data.tongSoDonRent || 0} đơn`;
        document.getElementById("statsTotalUsers").innerText = `${res.data.tongSoUser || 0} thành viên`;
    } else {
        console.warn("⚠️ Không thể lấy số liệu thực tế từ API /statistics/dashboard");
    }
}