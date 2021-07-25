const { response } = require("express");
var express = require("express");
var { Op } = require("sequelize");
var router = express.Router();
const db = require("../models/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  db.Content.findAll().then((contents) => {
    res.json(contents);
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

router.post("/search", (req, res, next) => {
  console.log(req.body.data.searchCategory);

  db.Content.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: "%" + req.body.data.searchWord + "%" },
        description: { [Op.like]: "%" + req.body.data.searchWord + "%" },
      },
      category: { [Op.like]: "%" + req.body.data.searchCategory + "%" },
    },
  })
    .then((contents) => [res.send(contents)])
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
