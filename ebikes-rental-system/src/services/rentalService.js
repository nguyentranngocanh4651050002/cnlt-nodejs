const Rental = require("../models/Rental");

// lấy tất cả
exports.getRentals = async () => {
    return await Rental.find();
};

// lấy theo id
exports.getRentalById = async (id) => {
    return await Rental.findById(id);
};

// tạo mới
exports.createRental = async (data) => {
    const rental = new Rental(data);
    return await rental.save();
};

// update
exports.updateRental = async (id, data) => {
    return await Rental.findByIdAndUpdate(id, data, { new: true });
};

// delete
exports.deleteRental = async (id) => {
    return await Rental.findByIdAndDelete(id);
};