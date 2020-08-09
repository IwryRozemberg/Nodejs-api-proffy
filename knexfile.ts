import path from 'path';

const environment = process.env.ENV || 'development';
const { host, user, password, name, dialect } = require('./src/config/config')[environment].database;


module.exports = {
  client: dialect,
  connection: {
    host,
    user,
    password,
    database: name,
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true,
};