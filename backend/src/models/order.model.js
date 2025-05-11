const { Model, DataTypes } = require('sequelize');

const ORDER_TB = 'order';

class Order extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TB,
            modelName: 'Order',
            timestamps: false
        };
    }
}

const OrderSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    manifestoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'manifesto_id'
    },
    senderId: {
        type: DataTypes.STRING(10),
        allowNull: false,   
        field: 'sender_id'
    },
    receiverId: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: 'receiver_id'
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'state'
    },
    registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'registration_date'
    },
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'delivery_date'
    },
    totalPackages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total_packages'
    },
    totalWeight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'total_weight'
    },
    ticketPdf: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'ticket_pdf'
    },
    facturaPdf: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'invoice_pdf'
    },
};

module.exports = { Order, OrderSchema };