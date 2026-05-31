const News = require("../models/newsModel");

const getNews = async () => {
    return await News.find();
};

const createNews = async (data) => {
    return await News.create(data);
};

module.exports = {
    getNews,
    createNews
};