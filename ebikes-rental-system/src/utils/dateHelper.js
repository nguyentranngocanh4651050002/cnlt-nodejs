const formatDate = (date) => {
    return new Date(date).toLocaleDateString("vi-VN");
};

const formatDateTime = (date) => {
    return new Date(date).toLocaleString("vi-VN");
};

module.exports = {
    formatDate,
    formatDateTime
};