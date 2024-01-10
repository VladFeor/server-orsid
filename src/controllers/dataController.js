const { User } = require("../models/User");
const axios = require("axios");
const { UserData } = require("../models/UserData");

const getDate = async (id) => {
  const urlArr = ["person", "works"];
  const profileUrl = `${process.env.ORCID_URL}${id}/`;
  let result = {};
  try {
    for (let i = 0; i < urlArr.length; i++) {
      result[urlArr[i]] = (await axios.get(`${profileUrl}${urlArr[i]}`)).data;
    }
  } catch (err) {
    result = null;
    console.log(err);
  }
  return result;
};

getUserDataFromDB = async (orcid) => {
  return await UserData.findByPk(orcid).then((userData) => {
    if (userData) {
      return userData;
    } else {
      console.log(`Не знайдено даних користувача ${orcid}`);
      return;
    }
  });
};

updateUserData = async (updatedData, orcid) => {
  return await UserData.findOrCreate({
    where: { orcid },
    defaults: updatedData,
  })
    .then(([userData, created]) => {
      if (created) {
        console.log(`Створено нового користувача з orcid ${orcid}.`);
      } else {
        console.log(`Оновлено користувача з orcid ${orcid}.`);
      }
      return userData;
    })
    .catch((error) => {
      console.error("Помилка при оновленні або створенні користувача:", error);
      return null;
    });
};

const getDataByOrcid = async (req, res) => {
  const { orcid } = req.params;
  let result = { orcid, data: [] };
  let userData = await getDate(orcid);

  if (userData) {
    userData.works.group.forEach((item) => {
      result.data.push(JSON.stringify(item));
    });
    result = await updateUserData(result, orcid);
  } else {
    result = await getUserDataFromDB(orcid);
  }
  res.json(result);
};

const getUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createUser = (req, res) => {
  const { full_name, orcid, rank, position, section } = req.body;
  User.create({ full_name, orcid, rank, position, section })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const deleteUser = (req, res) => {
  const { orcid } = req.params;

  User.destroy({
    where: { orcid },
  })
    .then((deletedRowCount) => {
      if (deletedRowCount > 0) {
        console.log(`Користувач з orcid ${orcid} був видалений.`);
      } else {
        console.log(
          `Користувача з orcid ${orcid} не знайдено або не було видалено.`
        );
      }
    })
    .catch((error) => {
      console.error("Помилка при видаленні користувача:", error);
    });
  res.status(201).end();
};

module.exports = {
  getUsers,
  createUser,
  getDataByOrcid,
  deleteUser,
};
