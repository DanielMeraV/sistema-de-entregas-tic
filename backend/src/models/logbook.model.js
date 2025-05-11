const { Model, DataTypes } = require('sequelize');

const LOGBOOK_TB = 'logbook';

class Logbook extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: LOGBOOK_TB,
            modelName: 'Logbook',
            timestamps: false
        };
    }
}

const LogbookSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field:'id'
    },
    manifestoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'manifesto_id'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        field:'date'
    },
    datalogger: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'datalogger'
    },
    loadTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'load_time'
    },
    departureTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'departure_time'
    },
    loadTemperature: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'load_temperature'
    },
    loadHumidity: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'load_humidity'
    }
};

module.exports = { Logbook, LogbookSchema };
