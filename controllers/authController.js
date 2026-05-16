const authService = require('../services/authService');

async function register(req, res) {
    try {
        // 1. Receive user data and pass it to the Service layer
        const result = await authService.registerUser(req.body);

        // 2. If successful, return 201 status (Created) with the data
        res.status(201).json({
            message: "User and Wallet created successfully",
            user: {
                id: result.user.User_ID,
                name: result.user.User_Name,
                email: result.user.Email
            },  
            wallet: {
                id: result.wallet.Wallet_ID,
                balance: result.wallet.Balance,
                currency: result.wallet.Currency
            }
        });
    } catch (error) {
        // 3. Error handling (e.g., duplicate email or server issues)
        if (error.message === 'Email already registered') {
            return res.status(400).json({ error: "This email address is already registered." });
        }
        
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

module.exports = { register };