'use strict';
const { WalletSchema, WALLET_TABLE } = require('../models/walletModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(WALLET_TABLE, WalletSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(WALLET_TABLE);
  }
};
