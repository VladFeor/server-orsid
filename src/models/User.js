const { DataTypes } = require("sequelize");
const sequelize = require("../config/queries");
const { UserData } = require("./UserData");

const User = sequelize.define("User", {
  full_name: {
    type: DataTypes.STRING,
  },
  orcid: {
    type: DataTypes.TEXT,
  },
  rank: {
    type: DataTypes.TEXT,
  },
  position: {
    type: DataTypes.TEXT,
  },
  section: {
    type: DataTypes.TEXT,
  },
});

async function syncDatabase() {
  try {
    await User.sync({ force: false }); // force: true очистить таблицю і створить її знову
    await UserData.sync({ force: false });
    console.log("Таблиці User, UserData синхронізовані з базою даних.");
  } catch (error) {
    console.error("Помилка синхронізації таблиці:", error);
  }
}

module.exports = { User, syncDatabase };
