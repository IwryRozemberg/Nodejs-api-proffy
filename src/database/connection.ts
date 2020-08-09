import knex from 'knex';

const environment = process.env.ENV || 'development';
const { host, user, password, name, dialect } = require('../config/config')[environment].database;

const db = knex({
  client: dialect,
  connection: {
    host,
    user,
    password,
    database: name,
  },
  useNullAsDefault: true,
});

export default db;