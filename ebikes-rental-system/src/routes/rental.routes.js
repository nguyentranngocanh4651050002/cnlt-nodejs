const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Rental list OK" });
});

module.exports = router;