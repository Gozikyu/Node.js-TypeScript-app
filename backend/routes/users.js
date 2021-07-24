const { response } = require("express");
var express = require("express");
var router = express.Router();
const db = require("../models/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  db.User.findByPk(1).then((user) => {
    let data = {
      title: "data",
      user: user,
    };
    res.json(user);
  });
});

module.exports = router;
