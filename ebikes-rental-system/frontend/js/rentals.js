document.addEventListener("DOMContentLoaded", () => {
    const rentalList = document.getElementById("rentalListContainer");
    if (rentalList) loadMyRentals(rentalList);
});

async function loadMyRentals(container) {
    container.innerHTML = "<p>🔄 Đang tải danh sách đơn đặt xe của bạn...</p>";
    const res = await apiFetch("/rentals/my-orders"); // API lấy đơn của chính user đang đăng nhập

    if (!res.success || !res.data.length) {
        container.innerHTML = "<p>📭 Bạn chưa có đơn đặt thuê xe nào.</p>";
        return;
    }

    container.innerHTML = "";
    res.data.forEach(order => {
        container.innerHTML += `
            <div class="order-card">
                <h4>Đơn thuê mã: #${order._id.substring(0,8)}</h4>
                <p>🏍️ Xe: ${order.id_xe?.ten_xe || 'Đang xác minh'}</p>
                <p>📆 Thời gian: ${order.ngay_bat_dau.split('T')[0]} ➡️ ${order.ngay_ket_thuc.split('T')[0]}</p>
                <p>💰 Tổng tiền tạm tính: <strong>${order.tong_tien.toLocaleString('vi-VN')} đ</strong></p>
                <p>📌 Trạng thái đơn: <span class="status-${order.trang_thai}">${order.trang_thai}</span></p>
            </div>
        `;
    });
}