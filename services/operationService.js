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
    const oldOperation = await this.findOne(id);
    if(oldOperation.type === data.type){
      const difference = oldOperation.dataValues.amount - data.amount;
      let wallet;
      if (oldOperation.type === 'payment') {
        wallet = await service.update(oldOperation.walletId, difference);
      }
      if (oldOperation.type === 'entry') {
        wallet = await service.update(oldOperation.walletId, difference *-1);
      }
      const operation = await oldOperation.update(data)
      delete wallet.dataValues.operations;
      delete operation.dataValues.wallet;
      return {wallet, operation};
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
