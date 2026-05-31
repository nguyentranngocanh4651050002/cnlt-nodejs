// frontend/js/admin-gps.js
document.addEventListener("DOMContentLoaded", () => {
    initGPSMap();
});

function initGPSMap() {
    // 1. Khởi tạo bản đồ trỏ mặc định về trung tâm thành phố (Vĩ độ, Kinh độ, Độ phóng thu)
    const map = L.map('map').setView([10.762622, 106.660172], 13); 

    // 2. Cấu hình bản đồ phong cách "Dark Mode" từ CartoDB cực ngầu cho hợp Cyberpunk
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 20
    }).addTo(map);

    // 3. Gọi hàm quét vị trí xe
    fetchBikeLocations(map);
}

async function fetchBikeLocations(map) {
    // Gọi API lấy thông tin xe có chứa tọa độ GPS từ Backend
    const res = await apiFetch("/bikes/gps/realtime");
    
    if (!res.success || !res.data) {
        console.warn("⚠️ Không thể kết nối cổng dữ liệu GPS hoặc chưa có dữ liệu tọa độ.");
        return;
    }

    res.data.forEach(bike => {
        // Kiểm tra xe có dữ liệu tọa độ thực tế không
        if (bike.vi_do && bike.kinh_do) {
            // Tạo một biểu tượng ghim định vị màu xanh Neon phát sáng bằng HTML/CSS
            const neonIcon = L.divIcon({
                className: 'cyber-gps-marker',
                html: `<div style="
                    width: 12px; height: 12px; 
                    background: var(--primary-lime); 
                    border-radius: 50%; 
                    box-shadow: 0 0 10px var(--primary-lime), 0 0 20px var(--primary-lime);
                "></div>`,
                iconSize: [12, 12]
            });

            // Cắm ghim lên bản đồ kèm thông tin bong bóng popup khi click vào
            L.marker([bike.vi_do, bike.kinh_do], { icon: neonIcon })
                .addTo(map)
                .bindPopup(`
                    <div style="color: #000; font-family: monospace;">
                        <strong>🏍️ Xe: ${bike.ten_xe}</strong><br>
                        📌 Biển số: ${bike.bien_so_xe}<br>
                        ⚡ Trạng thái: ${bike.trang_thai_xe === 'available' ? 'Trong bãi' : 'Đang di chuyển'}
                    </div>
                `);
        }
    });
}