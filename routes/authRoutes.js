const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { register } = require('../controllers/authController');
const { getBalance } = require('../controllers/walletController');

// Register endpoint (public)
router.post('/register', register);

// Get wallet balance (requires JWT authentication)
router.get('/balance', protect, getBalance);


module.exports = router;