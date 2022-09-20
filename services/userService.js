const boom = require('@hapi/boom');
const faker = require('faker');
// const getConnection = require('../libs/postgres');

class userService{
  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    for (let i = 0; i < 10; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
      })
    }
  }

  async create(data) {
    const newUser = data;
    delete newUser.passwordConf;
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return this.users;
  };

  async findOne(email){
    const user = this.users.find(item => item.email === email);
    if (!user){
      throw boom.notFound('User not found');
    } else{
      return user;
    }
  };

  async update(email, data) {
    const index = this.users.findIndex(item => item.email === email);
    if (index === -1){
      throw boom.notFound('User not found');
    }
    const user = this.users[index];

    if(user.password !== data.password) {
      throw boom.unauthorized('Unautorized')
    }

    this.users[index].password = data.newPassword

    return this.users[index];
  };

  async delete(email) {
    const index = this.users.findIndex(item => item.email === email);
    if (index === -1){
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return email;
  }
}

module.exports = userService;
