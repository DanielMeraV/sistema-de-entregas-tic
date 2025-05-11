const { Model, DataTypes } = require('sequelize');

const LOGBOOK_DETAIL_TB = 'logbook_detail';

class LogbookDetail extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: LOGBOOK_DETAIL_TB,
            modelName: 'LogbookDetail',
            timestamps: false
        };
    }
}

const LogbookDetailSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field:'id'
    },
    logbookId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_logbook'
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_order'
    },
    temperature: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field:'temperature'
    },
    humidity: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field:'humidity'
    },
    deliveryTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'delivery_time'
    },
    deliveryPhoto: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'delivery_photo'
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
        field:'remarks'
    }
};

module.exports = { LogbookDetail, LogbookDetailSchema };
