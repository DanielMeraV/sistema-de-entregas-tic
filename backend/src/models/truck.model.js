const { Model, DataTypes } = require('sequelize');

const TRUCK_TB = 'truck';

class Truck extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TRUCK_TB,
            modelName: 'Truck',
            timestamps: false
        };
    }
}

const TruckSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'user_id'
    },
    licensePlate: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'license_plate'
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'type'
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'state'
    },
    entryTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'entry_time'
    },
    departureTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'departure_time'
    }
};

module.exports = { Truck, TruckSchema };