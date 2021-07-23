const { response } = require("express");
var express = require("express");
var router = express.Router();
const db = require("../models/index");
const cors = require("cors");

/* GET users listing. */
router.get("/", function (req, res, next) {
  db.User.findByPk(1).then((user) => {
    let data = {
      title: "users",
      user: user,
    };
    res.json(data);
  });
});

router.post("/", function (req, res, next) {
  const data = {
    userId: req.body.data.userId,
    title: req.body.data.title,
    category: req.body.data.category,
    url: req.body.data.url,
    description: req.body.data.description,
  };
  console.log(req.body.data);
  db.sequelize.sync().then(() => {
    db.Content.create(data)
      .then((content) => {
        res.send(content);
      })
      .catch(() => {
        res.send("fail to create content");
      });
  });
  // res.send(req.body.data.title);
});

module.exports = router;
