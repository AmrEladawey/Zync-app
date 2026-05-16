const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { register } = require('../controllers/authController');
const { getBalance } = require('../controllers/walletController');

// Register endpoint (public)
router.post('/register', register);

// Get wallet balance (requires JWT authentication)
router.get('/balance', protect, getBalance);

// Test endpoint (optional)
router.get('/status', (req, res) => {
    res.send("Zync API is online!");
});

module.exports = router;