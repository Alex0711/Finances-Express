const { Model, DataTypes, Sequelize } = require('sequelize');

const OPERATION_TABLE = 'operations';

const OperationSchema = {
  id: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  conecept: {
    allowNull: false,
    type: DataTypes.STRING
  },
  mount: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  createdAt: {
    allowNull:false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Operation extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OPERATION_TABLE,
      modelName: 'Operation',
      timestamps: false
    }
  }
}

module.exports = { OPERATION_TABLE, OperationSchema, Operation };
