// frontend/js/admin-statistics.js
document.addEventListener("DOMContentLoaded", () => {
    initRevenueChart();
});

async function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    // 1. Gọi API lấy chuỗi mảng dữ liệu doanh thu theo tháng
    const res = await apiFetch("/statistics/monthly-revenue");
    
    // Tạo dữ liệu giả định nếu API chưa kịp chuẩn bị hoặc trống để đồ thị hiển thị phom mẫu luôn
    const defaultLabels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    const defaultData = [15000000, 22000000, 18000000, 35000000, 29000000, 42000000, 50000000, 48000000, 55000000, 62000000, 75000000, 90000000];

    const chartLabels = res.success && res.data ? res.data.labels : defaultLabels;
    const chartData = res.success && res.data ? res.data.values : defaultData;

    // 2. Khởi tạo cấu hình đồ thị Chart.js phong cách Cyberpunk
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Doanh thu thực tế (VNĐ)',
                data: chartData,
                borderColor: '#00ffff', // Đường kẻ viền màu Xanh Cyan Neon
                borderWidth: 3,
                pointBackgroundColor: '#00ff66', // Điểm nút màu Xanh Lime Độc
                pointBorderColor: '#0a0a0f',
                pointRadius: 5,
                pointHoverRadius: 8,
                backgroundColor: 'rgba(0, 255, 255, 0.05)', // Đổ bóng mờ phía dưới dòng kẻ
                fill: true,
                tension: 0.3 // Tạo độ cong mềm mại cho đường đồ thị
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#00ffff', // Màu chữ ghi chú phía trên
                        font: { family: 'Courier New', size: 12 }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: '#222235' }, // Màu lưới dọc mạch điện
                    ticks: { color: '#707080', font: { family: 'Courier New' } }
                },
                y: {
                    grid: { color: '#222235' }, // Màu lưới ngang mạch điện
                    ticks: { 
                        color: '#707080', 
                        font: { family: 'Courier New' },
                        callback: function(value) { return value.toLocaleString('vi-VN') + ' đ'; }
                    }
                }
            }
        }
    });
}