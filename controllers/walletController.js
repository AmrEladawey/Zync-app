const Wallet = require('../models/Wallet');

async function getBalance(req, res) {
    try {
        // الـ user ID يأتي من authMiddleware بعد التحقق من JWT
        const userId = req.user.User_ID;

        // البحث عن المحفظة بناءً على User_ID
        const wallet = await Wallet.findOne({ where: { User_ID: userId } });

        if (!wallet) {
            return res.status(404).json({ error: "Wallet not found" });
        }

        res.status(200).json({
            message: "Wallet balance retrieved successfully",
            wallet: {
                id: wallet.Wallet_ID,
                balance: wallet.Balance,
                currency: wallet.Currency,
                user_id: wallet.User_ID
            }
        });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({ error: "Failed to fetch balance", details: error.message });
    }
}

module.exports = { getBalance };
