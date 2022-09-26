const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const walletService = require('./walletService');

const service = new walletService();

class operationService{
  constructor(){
  }

  async updateWallet(operationType, amount, walletId){
    let wallet;
    if(operationType === "payment") {
      wallet = await service.update(walletId, amount*-1);
    }
    if(operationType === "entry") {
      wallet = await service.update(walletId, amount);
    }
    return wallet
  }

  async create(data) {
    const newOperation = await models.Operation.create(data);
    const wallet = await this.updateWallet(newOperation.type, newOperation.amount, newOperation.walletId)
    return {newOperation, wallet};
  }

  async find() {
    const operations = await models.Operation.findAll();
    return operations;
  };

  async findOne(id){
    const operation = await models.Operation.findByPk(id, {include: ['wallet']});
    if (!operation){
      throw boom.notFound('Operation not found');
    } else{
      return operation;
    }
  };

  async update(id, data) {
    const operation = await this.findOne(id);
    if(operation.type === data.type){
      const wallet = await this.updateWallet(operation.type, (operation.amount - data.amount)*-1, operation.walletId)
      await operation.update(data)
      return {operation, wallet};
    }
    throw boom.badRequest('Can not change the type of operation')
  };

  async delete(id) {
    const operation = await this.findOne(id);
    await operation.destroy()
    const wallet = await this.updateWallet(operation.type, operation.amount*-1, operation.walletId)
    return { wallet };
  }
}

module.exports = operationService;
