const { Sequelize } = require('sequelize');
const setupModels = require('../models');
const config = require('./config');

const sequelize = new Sequelize({
    host: config.DB_HOST,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: config.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: false,
            rejectUnauthorized: false
        }
    }
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
