'use strict';
const { OperationSchema, OPERATION_TABLE } = require('../models/operationModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(OPERATION_TABLE, OperationSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(OPERATION_TABLE);
  }
};
