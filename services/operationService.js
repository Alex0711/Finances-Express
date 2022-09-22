const faker = require('faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize')

class operationService{
  constructor(){
    this.operations = [];
    this.generate();
  }

  generate(){
    for (let i = 0; i < 100; i++) {
      this.operations.push({
        id: i,
        concept: faker.finance.transactionType(),
        amount: faker.finance.amount(),
        date: faker.date.recent(),
        type: 'payment'
      })
    }
  }

  async create(data) {
    const date = new Date();
    const timeZone = date.getTimezoneOffset();
    const newOperation = {
      id: this.operations.length,
      ...data,
      date: new Date(date + 'GMT' + timeZone),
    };
    this.operations.push(newOperation);
    return newOperation;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const [data, metadata] = await sequelize.query(query);
    return { data, metadata};
  };

  async findOne(id){
    const operation = this.operations.find(item => item.id === Number(id));
    if (!operation){
      throw boom.notFound('Operation not found');
    } else{
      return operation;
    }
  };

  async update(id, data) {
    const index = this.operations.findIndex(item => item.id === Number(id));
    if (index === -1){
      throw boom.notFound('Operation not found');
    }
    const operation = this.operations[index];
    this.operations[index] = {
      ...operation,
      ...data
    };
    return this.operations[index];
  };

  async delete(id) {
    const index = this.operations.findIndex(item => item.id === Number(id));
    if (index === -1){
      throw boom.notFound('Operation not found');
    }
    this.operations.splice(index, 1);
    return id;
  }
}

module.exports = operationService;
