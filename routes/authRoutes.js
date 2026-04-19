const express = require('express');
const router = express.Router();

// This is just a test to make the error go away
router.get('/status', (req, res) => {
    res.send("Zync API is online!");
});

module.exports = router;