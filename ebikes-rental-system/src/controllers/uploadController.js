exports.uploadImage =
async (req, res) => {

    res.json({
        success: true,
        file: req.file.filename
    });

};