const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DATABASE,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
});

module.exports = sequelize;
