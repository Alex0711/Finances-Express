const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class walletService{
  constructor(){
  }

  async create(data) {
    const newWallet = await models.Wallet.create(data);
    return newWallet;
  }

  async findOne(id){
    const wallet = await models.Wallet.findByPk(id);
    if (!wallet){
      throw boom.notFound('Wallet not found');
    } else{
      return wallet;
    }
  };

  async update(id, operation) {
    const wallet = await this.findOne(id);
    if(operation.type === 'payment'){
      wallet.money -= operation.amount;
    };

    if(operation.type === 'entry'){
      wallet.money += operation.amount;
    }

    const rta = await wallet.update(wallet.money)
    return rta;
  };

  async delete(id) {
    const wallet = await this.findOne(id);
    const rta = await wallet.destroy()
    return rta;
  }
}

module.exports = walletService;
