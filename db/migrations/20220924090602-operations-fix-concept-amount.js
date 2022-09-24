'use strict';
const { OPERATION_TABLE } = require('../models/operationModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.renameColumn(OPERATION_TABLE, 'conecept', 'concept');
    await queryInterface.renameColumn(OPERATION_TABLE, 'mount', 'amount');
  },

  async down (queryInterface) {
    await queryInterface.renameColumn(OPERATION_TABLE, 'concept', 'conecept');
    await queryInterface.renameColumn(OPERATION_TABLE, 'amount', 'mount');
  }
};
