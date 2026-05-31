const Payment =
require("../models/paymentModel");

const getPayments = async () => {
    return await Payment.find();
};

const createPayment = async (
    data
) => {

    return await Payment.create(data);

};

module.exports = {
    getPayments,
    createPayment
};