const Category = require("../models/categoryModel");

const getCategories = async () => {
    return await Category.find();
};

const createCategory = async (data) => {
    return await Category.create(data);
};

module.exports = {
    getCategories,
    createCategory
};