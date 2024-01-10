const { DataTypes } = require("sequelize");
const sequelize = require("../config/queries");

const UserData = sequelize.define("User_data", {
  orcid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  data: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
  },
});

module.exports = { UserData };
