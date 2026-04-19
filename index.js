const express = require('express');
const sequelize = require('./config/database');

// 1. Import Models
const User = require('./models/User');
// const Wallet = require('./models/Wallet');
// const Transaction = require('./models/Transaction');

const app = express();
app.use(express.json()); 

// ==========================================
// 2. DATABASE ASSOCIATIONS
// ==========================================
// We will add the Wallet and Transaction relationships 
// here later once your teammate finishes those files!

// ==========================================
// 3. TURN ON THE SERVER
// ==========================================
sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced successfully! The Users table is built.");
    
    app.listen(3000, () => {
        console.log("Zync Server is running on port 3000");
    });
}).catch(err => {
    console.error("Error syncing database:", err);
});