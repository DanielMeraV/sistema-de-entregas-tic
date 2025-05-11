const { Model, DataTypes } = require('sequelize');

const CUSTOMER_TB = 'customer';

class Customer extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TB,
            modelName: 'Customer',
            timestamps: false
        };
    }
}

const CustomerSchema = {
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false,
        field: 'id',
    },
    companyName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'company_name',
    },
    ruc: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'ruc',
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'email',
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'address',
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'location',
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: 'phone',
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'city',
    },
};

module.exports = { Customer, CustomerSchema };