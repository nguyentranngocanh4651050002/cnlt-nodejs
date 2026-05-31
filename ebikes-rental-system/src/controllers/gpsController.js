const GPSDevice = require('../models/GPSDevice');

// CẬP NHẬT TỌA ĐỘ GPS TỪ THIẾT BỊ HOẶC MÔ PHỎNG XE CHẠY
exports.updateGPS = async (req, res) => {
    try {
        const { id_xe, kinh_do, vi_do, van_toc_hien_tai } = req.body;
        
        // Tìm xe xem đã có thiết bị gps chưa, nếu chưa thì tạo, có rồi thì cập nhật (upsert)
        const gpsCapNhat = await GPSDevice.findOneAndUpdate(
            { id_xe },
            { kinh_do, vi_do, van_toc_hien_tai },
            { new: true, upsert: true }
        );
        res.status(200).json({ success: true, message: "Định vị xe đã được cập nhật!", data: gpsCapNhat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// LẤY VỊ TRÍ ĐỂ VẼ LÊN BẢN ĐỒ GOOGLE MAPS (Trang gps-monitor.html)
exports.getVehicleLocation = async (req, res) => {
    try {
        const { bikeId } = req.params;
        const viTriXe = await GPSDevice.findOne({ id_xe: bikeId }).populate('id_xe', 'ten_xe bien_so_xe');
        if (!viTriXe) {
            return res.status(404).json({ success: false, message: "Xe này chưa kích hoạt thiết bị định vị GPS!" });
        }
        res.status(200).json({ success: true, data: viTriXe });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};