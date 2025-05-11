const { Model, DataTypes } = require('sequelize');

const LOCATION_TB = 'location';

class Location extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: LOCATION_TB,
            modelName: 'Location',
            timestamps: false
        };
    }
}

const LocationSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    truckId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_truck'
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
};

module.exports = { Location, LocationSchema };