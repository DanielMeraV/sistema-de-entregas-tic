const { User, UserSchema } = require('./user.model');
const { Order, OrderSchema } = require('./order.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Manifesto, ManifestoSchema } = require('./manifesto.model');
const { Truck, TruckSchema } = require('./truck.model');
const { Location, LocationSchema } = require('./location.model');
const { LocationLatest, LocationLatestSchema } = require('./location-latest.model');
const { Logbook, LogbookSchema } = require('./logbook.model'); 
const { LogbookDetail, LogbookDetailSchema } = require('./logbook-details.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Manifesto.init(ManifestoSchema, Manifesto.config(sequelize));
    Truck.init(TruckSchema, Truck.config(sequelize));
    Location.init(LocationSchema, Location.config(sequelize));
    LocationLatest.init(LocationLatestSchema, LocationLatest.config(sequelize));
    Logbook.init(LogbookSchema, Logbook.config(sequelize));
    LogbookDetail.init(LogbookDetailSchema, LogbookDetail.config(sequelize));

    // Definir las relaciones entre los modelos
    Order.belongsTo(Manifesto, { foreignKey: 'manifestoId', as: 'manifesto' });
    Order.belongsTo(Customer, { foreignKey: 'senderId', as: 'sender' });
    Order.belongsTo(Customer, { foreignKey: 'receiverId', as: 'receiver' });
    Manifesto.belongsTo(Truck, { foreignKey: 'truckId', as: 'truck' });
    Manifesto.hasMany(Order, { foreignKey: 'manifestoId', as: 'orders' });
    Location.belongsTo(Truck, { foreignKey: 'truckId', as: 'truck' });
    LocationLatest.belongsTo(Truck, { foreignKey: 'truckId', as: 'truck' });
    Logbook.belongsTo(Manifesto, { foreignKey: 'manifestoId', as: 'manifesto' });
    LogbookDetail.belongsTo(Logbook, { foreignKey: 'logbookId', as: 'logbook' });
    LogbookDetail.belongsTo(Logbook, { foreignKey: 'orderId', as: 'order' });

}

module.exports = setupModels;