const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "User list OK" });
});

module.exports = router;