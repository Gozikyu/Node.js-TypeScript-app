const { response } = require("express");
var express = require("express");
var router = express.Router();
const db = require("../models/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  db.User.findByPk(1).then((user) => {
    let data = {
      title: "users",
      usersName: user.name,
    };
    res.render("users", data);
  });
});

router.post("/", function (req, res, next) {
  db.User.findByPk(1).then((user) => {
    let data = {
      title: "users",
      usersName: user.name,
    };
    res.json(user);
  });
});

module.exports = router;
