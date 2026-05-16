const bcrypt = require('bcrypt');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const sequelize = require('../config/database'); // Required to use Database Transactions

async function registerUser(userData) {
    const { User_Name, Email, Password_Hash, Phone_Num } = userData;

    // 1. Check if the email is already registered
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
        throw new Error('Email already registered'); 
    }

    // 2. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password_Hash, salt);

    // 3. Use a Database Transaction
    // Transactions ensure data integrity: if creating the wallet fails, 
    // the user creation is rolled back so we don't have a user without a wallet.
    const result = await sequelize.transaction(async (t) => {
        
        // Create the User
        const newUser = await User.create({
            User_Name,
            Email,
            Password_Hash: hashedPassword,
            Phone_Num
        }, { transaction: t });

        // Create the Wallet and link it to the new User
        const newWallet = await Wallet.create({
            User_ID: newUser.User_ID // Link using the newly created User's ID
        }, { transaction: t });

        // Return the data for the Controller to use
        return { user: newUser, wallet: newWallet };
    });

    return result;
}

module.exports = { registerUser };