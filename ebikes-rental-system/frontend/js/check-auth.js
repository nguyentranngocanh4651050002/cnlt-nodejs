// frontend/js/check-auth.js
document.addEventListener("DOMContentLoaded", () => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    // Nếu chưa đăng nhập -> Đá bay về trang login
    if (!token || !userString) {
        alert("⚠️ Bạn cần đăng nhập để truy cập tính năng này!");
        window.location.href = "/frontend/auth/login.html";
        return;
    }

    const user = JSON.parse(userString);
    const currentPath = window.location.pathname;

    // Nếu cố tình vào trang admin nhưng vai trò không phải admin -> Đẩy ra ngoài
    if (currentPath.includes("/admin/") && user.vai_tro !== "admin") {
        alert("⛔ Bạn không có quyền truy cập khu vực Quản trị!");
        window.location.href = "/frontend/customer/home.html";
    }

    // Nếu cố tình vào trang staff nhưng không phải nhân viên/admin -> Đẩy ra ngoài
    if (currentPath.includes("/staff/") && user.vai_tro !== "staff" && user.vai_tro !== "admin") {
        alert("⛔ Khu vực này chỉ dành cho nhân viên hệ thống!");
        window.location.href = "/frontend/customer/home.html";
    }
});