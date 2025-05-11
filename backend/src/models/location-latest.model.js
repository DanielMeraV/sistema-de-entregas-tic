const { Model, DataTypes } = require('sequelize');

const LOCATION_LATEST_TB = 'location_latest';

class LocationLatest extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: LOCATION_LATEST_TB,
            modelName: 'LocationLatest',
            timestamps: false
        };
    }
}

const LocationLatestSchema = {
    truckId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'id_truck'
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'time'
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'location'
    },
};

module.exports = { LocationLatest, LocationLatestSchema };