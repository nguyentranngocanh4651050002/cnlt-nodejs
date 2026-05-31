const User = require("../models/userModel");

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (data) => {
    return await User.create(data);
};

module.exports = {
    findUserByEmail,
    createUser
};