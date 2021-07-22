const { response } = require("express");
var express = require("express");
var router = express.Router();
const db = require("../models/index");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

/* GET users listing. */
router.get("/", cors(corsOptions), function (req, res, next) {
  db.User.findByPk(1).then((user) => {
    let data = {
      title: "users",
      user: user,
    };
    res.json(data);
  });
});

router.post("/", function (req, res, next) {
  db.User.findByPk(1).then((user) => {
    let data = {
      title: "users",
      usersName: user.name,
    };
    res.send(data);
  });
});

module.exports = router;
