const statisticsService =
require("../services/statisticsService");

exports.getDashboard =
async (req, res) => {

    const data =
        await statisticsService.getStatistics();

    res.json(data);
};