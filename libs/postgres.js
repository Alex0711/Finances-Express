const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'ale',
    password: 'admin123',
    database: 'my_wallet'
  });
  await client.connect()
  return client;
}

module.exports = getConnection;