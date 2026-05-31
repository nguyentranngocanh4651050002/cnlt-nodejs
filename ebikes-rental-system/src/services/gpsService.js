const getBikeLocation = async (
    latitude,
    longitude
) => {

    return {
        latitude,
        longitude,
        status: "Online"
    };

};

module.exports = {
    getBikeLocation
};