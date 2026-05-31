const Review =
require("../models/reviewModel");

const getReviews = async () => {
    return await Review.find()
        .populate("user")
        .populate("bike");
};

const createReview = async (
    data
) => {

    return await Review.create(data);

};

module.exports = {
    getReviews,
    createReview
};