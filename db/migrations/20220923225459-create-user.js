'use strict';
const { UserSchema, USER_TABLE } = require('../models/userModel');
const { WalletSchema, WALLET_TABLE } = require('../models/walletModel');
const { OperationSchema, OPERATION_TABLE } = require('../models/operationModel');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(WALLET_TABLE, WalletSchema);
    await queryInterface.createTable(OPERATION_TABLE, OperationSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(WALLET_TABLE);
    await queryInterface.dropTable(OPERATION_TABLE);
  }
};
