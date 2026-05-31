// frontend/js/auth.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Xử lý Đăng Nhập
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const res = await apiFetch("/auth/login", {
                method: "POST",
                body: { email, password }
            });

            if (res.success && res.token) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("role", res.role); // Lưu quyền (admin/customer) để phân luồng
                
                alert("🎉 Đăng nhập thành công! Đang đồng bộ quyền hạn...");
                // Phân tuyến hướng đi sau đăng nhập
                if (res.role === "admin") {
                    window.location.href = "../admin/dashboard.html";
                } else {
                    window.location.href = "../customer/home.html";
                }
            } else {
                alert(`❌ Đăng nhập thất bại: ${res.message}`);
            }
        });
    }

    // 2. Xử lý Đăng Ký
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = {
                ho_ten: document.getElementById("ho_ten").value,
                email: document.getElementById("reg_email").value,
                so_dien_thoai: document.getElementById("so_dien_thoai").value,
                password: document.getElementById("reg_password").value
            };

            const res = await apiFetch("/auth/register", { method: "POST", body: data });
            if (res.success) {
                alert("🎉 Khởi tạo tài khoản thành công! Hãy đăng nhập.");
                window.location.href = "login.html";
            } else {
                alert(`❌ Lỗi đăng ký: ${res.message}`);
            }
        });
    }

    // 3. Xử lý Yêu Cầu Quên Mật Khẩu
    const forgotForm = document.getElementById("forgotForm");
    if (forgotForm) {
        forgotForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("forgot_email").value;
            const res = await apiFetch("/auth/forgot-password", { method: "POST", body: { email } });
            if (res.success) {
                alert("📩 Hệ thống đã gửi Token khôi phục vào Email của bạn. Vui lòng kiểm tra hộp thư!");
            } else {
                alert(`❌ Lỗi: ${res.message}`);
            }
        });
    }
});