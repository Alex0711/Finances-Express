const { Model, DataTypes, Sequelize } = require('sequelize');

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
  },
  createdAt: {
    allowNull:false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Wallet extends Model {
  static associate() {

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
