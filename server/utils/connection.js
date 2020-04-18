const { Client } = require('pg');

const db = 'postgres://user:pass@postgres:5432/db';

const client = () => {
  const c = new Client(db);
  c.connect();
  return c;
};

module.exports = client;