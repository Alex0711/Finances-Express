const faker = require('faker');

class paymentsService{
  constructor(){
    this.payments = [];
    this.generate();
  }

  generate(){
    for (let i = 0; i < 100; i++) {
      this.payments.push({
        id: faker.datatype.uuid(),
        transactionType: faker.finance.transactionType(),
        amount: faker.finance.amount(),
        date: faker.date.recent(),
        type: "Payment"
      })
    }
  }

  async create(data) {
    const date = new Date();
    const timeZone = date.getTimezoneOffset();
    const newPayment = {
      id: faker.datatype.uuid(),
      ...data,
      date: new Date(date + 'GMT' + timeZone),
      type: 'Payment'
    };
    this.payments.push(newPayment);
    return newPayment;
  }

  async find() {
    return this.payments;
  };

  async findOne(id){
    const payment = this.payments.find(item => item.id === id);
    if (!payment){
      throw new Error('Payment not found');
    } else{
      return payment;
    }
  };

  async update(id, data) {
    const index = this.payments.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('Payment not found');
    }
    const payment = this.payments[index];
    this.payments[index] = {
      ...payment,
      ...data
    };
    return this.payments[index];
  };

  async delete(id) {
    const index = this.payments.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('Payment not found');
    }
    this.payments.splice(index, 1);
    return id;
  }
}

module.exports = paymentsService;
