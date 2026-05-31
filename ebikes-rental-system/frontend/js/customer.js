document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get("id");
    
    if (bikeId && document.getElementById("bikeDetailContainer")) {
        loadBikeDetail(bikeId);
    }
});

async function loadBikeDetail(id) {
    const container = document.getElementById("bikeDetailContainer");
    const res = await apiFetch(`/bikes/${id}`);

    if (!res.success || !res.data) {
        container.innerHTML = "<p style='color: var(--danger); text-align: center;'>❌ Không thể tải thông tin chiếc xe này!</p>";
        return;
    }

    const bike = res.data;
    const serverUrl = "http://localhost:5000";
    const imgUrl = bike.duong_dan_anh ? (bike.duong_dan_anh.startsWith('http') ? bike.duong_dan_anh : `${serverUrl}${bike.duong_dan_anh}`) : '../assets/image/banner.jpg';

    container.innerHTML = `
        <div class="detail-card">
            <div class="detail-image-box">
                <img src="${imgUrl}" alt="${bike.ten_xe}">
            </div>
            <div class="detail-info-box">
                <span class="category-tag">${bike.id_danh_muc?.ten_danh_muc || 'Mô tô'}</span>
                <h2>${bike.ten_xe}</h2>
                
                <div class="specs-grid">
                    <div class="spec-item">🔢 Biển số: <strong>${bike.bien_so_xe}</strong></div>
                    <div class="spec-item">📌 Trạng thái: <strong style="color: var(--primary-yellow)">${bike.trang_thai_xe === 'available' ? 'Sẵn sàng' : 'Đã đặt'}</strong></div>
                </div>

                <p class="description-text">${bike.mo_ta_chi_tiet || 'Xe đời mới vận hành êm ái, được bảo dưỡng định kỳ hàng tháng.'}</p>
                
                <div class="price-highlight">
                    Giá thuê: <span>${bike.gia_thue_theo_ngay.toLocaleString('vi-VN')} đ</span> / ngày
                </div>
                
                <form id="rentalForm" class="booking-form">
                    <div class="date-group">
                        <div>
                            <label>Ngày nhận xe</label>
                            <input type="date" id="ngay_bat_dau" required>
                        </div>
                        <div>
                            <label>Ngày trả xe</label>
                            <input type="date" id="ngay_ket_thuc" required>
                        </div>
                    </div>
                    <button type="submit" class="btn-book">GỬI YÊU CẦU ĐẶT THUÊ XE</button>
                </form>
            </div>
        </div>
    `;

    // Xử lý sự kiện đặt xe
    document.getElementById("rentalForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const ngay_bat_dau = document.getElementById("ngay_bat_dau").value;
        const ngay_ket_thuc = document.getElementById("ngay_ket_thuc").value;

        const rentRes = await apiFetch("/rentals", {
            method: "POST",
            body: { id_xe: id, ngay_bat_dau, ngay_ket_thuc }
        });

        if (rentRes.success) {
            alert("🎉 Đơn thuê xe đã được gửi! Vui lòng chờ nhân viên xác nhận kho.");
            window.location.href = "rentals.html";
        } else {
            alert(`❌ Lỗi đặt thuê: ${rentRes.message}`);
        }
    });
}