const { Model, DataTypes, Sequelize } = require('sequelize');
const { WALLET_TABLE } = require('./walletModel')

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
  concept: {
    allowNull: false,
    type: DataTypes.STRING
  },
  amount: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  createdAt: {
    allowNull:false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  walletId: {
    allowNull:false,
    type: DataTypes.INTEGER,
    field: 'wallet_id',
    references: {
      model: WALLET_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class Operation extends Model {
  static associate(models) {
    this.belongsTo(models.Wallet, {as: 'wallet'});
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
