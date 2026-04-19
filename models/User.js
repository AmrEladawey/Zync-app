const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    User_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    User_Name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    Password_Hash: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    Phone_Num: {
        type: DataTypes.STRING(11),
        allowNull: true
    }
}, {
    tableName: 'users'
});

module.exports = User;