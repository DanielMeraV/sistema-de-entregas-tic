const { Model, DataTypes } = require('sequelize');

const USER_TB = 'user';

class User extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TB,
            modelName: 'User',
            timestamps: false
        }
    }
}

const UserSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'username'
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'password'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'name'
    },
    userType: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'user_type'
    },
};


module.exports = {User, UserSchema}