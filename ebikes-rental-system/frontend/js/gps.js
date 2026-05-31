async function trackVehicleGPS(bikeId) {
    const res = await apiFetch(`/gps/bike/${bikeId}`);
    if (res.success && res.data) {
        console.log(`📍 Tọa độ hiện tại: Kinh độ ${res.data.kinh_do}, Vĩ độ ${res.data.vi_do}`);
        // Code tích hợp map Google Maps / Leaflet nếu cần vẽ điểm lên màn hình
    }
}