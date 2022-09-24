const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./userModel')

const WALLET_TABLE = 'wallets';

const WalletSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  money: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  createdAt: {
    allowNull:false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Wallet extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: WALLET_TABLE,
      modelName: 'Wallet',
      timestamps: false
    }
  }
}

module.exports = { WALLET_TABLE, WalletSchema, Wallet };
