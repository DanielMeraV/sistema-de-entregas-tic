const { Model, DataTypes} = require('sequelize');

const MANIFESTO_TB = 'manifesto';

class Manifesto extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: MANIFESTO_TB,
            modelName: 'Manifesto',
            timestamps: false
        }
    }
}

const ManifestoSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        field: 'id'
    },
    truckId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'truck_id'
    },
    assignmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'assignment_date'
    },
    manifestoPdf: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'manifesto_pdf'
    },
    referralGuidePdf: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'referral_guide_pdf'
    }
};

module.exports = { Manifesto, ManifestoSchema };