const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Transaction = sequelize.define('Transaction', {
    Transaction_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,  
        autoIncrement: true
    },
   Sender_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Receiver_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Status : {
        type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
        allowNull: false,
        defaultValue: 'Pending'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

}, {
    tableName: 'transactions'
});
module.exports = Transaction

    