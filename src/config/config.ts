module.exports = {
  development: {
    port: 3333,
    host: 'localhost',
    database: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      name: 'proffy',
      user: 'root',
      password: 'password',
    },
    secret: '1C3C7E1694F1E9DAD939399E87E5FFB5DF06B2327CA31B409CB3'
  },
  production: {
    host: process.env.EV_HOST,
    port: process.env.EV_PORT,
    database: {
      dialect: 'mysql',
      host: process.env.BD_HOST,
      port: process.env.BD_PORT,
      name: process.env.BD_NAME,
      user: process.env.DB_USER,
      password: process.env.BD_PASSWORD,
    },
    secret: process.env.JWT_SECRET,
  }
};