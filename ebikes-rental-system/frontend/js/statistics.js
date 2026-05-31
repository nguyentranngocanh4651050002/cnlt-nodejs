document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("statsTotalRevenue")) {
        loadDashboardStats();
    }
});

async function loadDashboardStats() {
    const res = await apiFetch("/statistics/dashboard");
    if (res.success) {
        document.getElementById("statsTotalRevenue").innerText = `${res.data.tongDoanhThu.toLocaleString('vi-VN')} đ`;
        document.getElementById("statsTotalBikes").innerText = `${res.data.tongSoXe} xe`;
        document.getElementById("statsTotalRentals").innerText = `${res.data.tongSoDonRent} đơn`;
        document.getElementById("statsTotalUsers").innerText = `${res.data.tongSoUser} thành viên`;
    }
}