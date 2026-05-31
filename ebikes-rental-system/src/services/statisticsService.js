const Rental =
require("../models/rentalModel");

const User =
require("../models/userModel");

const Bike =
require("../models/bikeModel");

const getStatistics =
async () => {

    const totalUsers =
        await User.countDocuments();

    const totalBikes =
        await Bike.countDocuments();

    const totalRentals =
        await Rental.countDocuments();

    return {
        totalUsers,
        totalBikes,
        totalRentals
    };
};

module.exports = {
    getStatistics
};