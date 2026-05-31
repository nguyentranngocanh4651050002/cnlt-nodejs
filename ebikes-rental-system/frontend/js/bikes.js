document.addEventListener("DOMContentLoaded", () => {
    const bikeContainer = document.getElementById("bikeListContainer");
    if (bikeContainer) {
        fetchAndRenderBikes(bikeContainer);
    }
});

async function fetchAndRenderBikes(container) {
    container.innerHTML = `<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">🔄 Đang tải dữ liệu từ bãi xe...</p>`;
    
    // Gọi đến API gốc của hệ thống
    const result = await apiFetch("/bikes");

    if (!result.success || !result.data || result.data.length === 0) {
        container.innerHTML = `<p style="color: var(--danger); text-align: center; grid-column: 1/-1;">⚠️ Không có xe nào khả dụng hoặc không thể kết nối server!</p>`;
        return;
    }

    container.innerHTML = ""; // Làm trống màn hình chờ

    // Đổ mảng dữ liệu xe máy từ Database lên thẻ HTML
    result.data.forEach(bike => {
        const card = document.createElement("div");
        card.className = "bike-card";

        // Định dạng trạng thái tiếng Việt trực quan
        const isAvailable = bike.trang_thai_xe === 'available';
        const statusText = isAvailable ? '🟢 Sẵn sàng thuê' : '🔴 Đã có khách đặt';
        const statusClass = isAvailable ? 'available' : 'rented';

        card.innerHTML = `
            <img src="${bike.duong_dan_anh || '../assets/image/banner.jpg'}" alt="${bike.ten_xe}">
            <div class="bike-info">
                <h3>${bike.ten_xe}</h3>
                <p>🔢 Biển kiểm soát: <strong>${bike.bien_so_xe}</strong></p>
                <p>🏷️ Phân khúc: ${bike.id_danh_muc?.ten_danh_muc || 'Xe Đời Mới'}</p>
                <div class="price">Giá: <span>${bike.gia_thue_theo_ngay.toLocaleString('vi-VN')} đ</span> / ngày</div>
                <div class="status ${statusClass}">${statusText}</div>
                <a href="bike-detail.html?id=${bike._id}" class="btn-detail">XEM CHI TIẾT</a>
            </div>
        `;
        container.appendChild(card);
    });
}
