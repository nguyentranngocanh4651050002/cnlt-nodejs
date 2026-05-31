const Bike = require("../models/bikeModel");

const getAllBikes = async () => {
    return await Bike.find();
};

const getBikeById = async (id) => {
    return await Bike.findById(id);
};

const createBike = async (data) => {
    return await Bike.create(data);
};

const updateBike = async (id, data) => {
    return await Bike.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
};

const deleteBike = async (id) => {
    return await Bike.findByIdAndDelete(id);
};

module.exports = {
    getAllBikes,
    getBikeById,
    createBike,
    updateBike,
    deleteBike
};