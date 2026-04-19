const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const wallet = sequelize.define('Wallet', {
    Wallet_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    Currency : {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'EGP'
    }
}, {
    tableName: 'wallets'
});
module.exports = wallet
        