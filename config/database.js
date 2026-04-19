const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Zync', 'root', 'password123', {
    host: 'localhost',
    dialect: 'mysql', 
    logging: false    
});

module.exports = sequelize;