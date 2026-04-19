const express = require('express');
const sequelize = require('./config/database');

// 1. Import All Models
const User = require('./models/User');
const Wallet = require('./models/Wallet');
const Transaction = require('./models/Transaction');

// 2. Import Routes
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware that allows Express to read JSON data from Postman
app.use(express.json()); 

// ==========================================
// 3. DATABASE ASSOCIATIONS (The ERD Lines)
// ==========================================

// A User has ONE Wallet
User.hasOne(Wallet, { foreignKey: 'user_id' });
Wallet.belongsTo(User, { foreignKey: 'user_id' });

// A Wallet can send MANY Transactions
Wallet.hasMany(Transaction, { foreignKey: 'sender_wallet_id', as: 'SentTransactions' });
Transaction.belongsTo(Wallet, { foreignKey: 'sender_wallet_id', as: 'Sender' });

// A Wallet can receive MANY Transactions
Wallet.hasMany(Transaction, { foreignKey: 'receiver_wallet_id', as: 'ReceivedTransactions' });
Transaction.belongsTo(Wallet, { foreignKey: 'receiver_wallet_id', as: 'Receiver' });


// ==========================================
// 4. CONNECT ROUTES
// ==========================================
app.use('/api/auth', authRoutes);


// ==========================================
// 5. TURN ON THE SERVER
// ==========================================
// Sync the database (this builds all 3 tables and their foreign keys!)
sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced successfully! All tables and relationships are built.");
    
    // Start the server
    app.listen(3000, () => {
        console.log("Zync Server is running on port 3000");
    });
}).catch(err => {
    console.error("Error syncing database:", err);
});