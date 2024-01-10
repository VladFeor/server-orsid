require("dotenv").config();
const cors = require("cors");
const express = require("express");
const {
  getUsers,
  createUser,
  getDataByOrcid,
  deleteUser,
} = require("./controllers/dataController");
const fs = require("fs");
const https = require("https");
const app = express();
const { syncDatabase } =  require("./models/User");

syncDatabase();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/users", getUsers);
app.get("/getDataByOrcid/:orcid", getDataByOrcid);
app.post("/users", createUser);
app.delete("/users/:orcid", deleteUser);

httpsOptions = {
  key: fs.readFileSync("ssl/key.pem"),
  cert: fs.readFileSync("ssl/cert.pem"),
};

https.createServer(httpsOptions, app).listen(process.env.PORT);
