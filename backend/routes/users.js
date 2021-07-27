const { response } = require("express");
var express = require("express");
var router = express.Router();
const db = require("../models/index");
let auth = require("../firebase.js");

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

router.post("/", function (req, res, next) {
  auth
    .createUserWithEmailAndPassword("node3@gmail.com", "password")
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
