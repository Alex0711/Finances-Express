'use strict';
const { DataTypes } = require('sequelize')
const { WALLET_TABLE } = require('../models/walletModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(WALLET_TABLE, 'user_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id',
      unique: true,
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(WALLET_TABLE);
  }
};
