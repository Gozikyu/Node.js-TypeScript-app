const { response } = require("express");
var express = require("express");
var { Op } = require("sequelize");
var router = express.Router();
// const db = require("../models/index");

// initialize firebase
let admin = require("firebase-admin");
let serviceAccount = require("../serviceAccountKey.json");
const { firestore } = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  let contents = [];
  const snapshot = await db.collection("contents").get();
  snapshot.docs.map((content) => {
    contents.push(content.data());
  });

  // db.Content.findAll().then((contents) => {
  res.json(contents);
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

router.post("/search", async (req, res, next) => {
  console.log("search");
  console.log(req.body.data.searchCategory);

  let contents = [];
  const snapshot = await db.collection("contents").get();
  await snapshot.docs.map((content) => {
    contents.push(content.data());
  });

  let filtered = contents.filter((content) => {
    return (
      (content.title.includes(req.body.data.searchWord) |
        content.description.includes(req.body.data.searchWord)) &
      content.category.includes(req.body.data.searchCategory)
    );
  });

  res.json(filtered);

  // db.Content.findAll({
  //   where: {
  //     [Op.or]: {
  //       title: { [Op.like]: "%" + req.body.data.searchWord + "%" },
  //       description: { [Op.like]: "%" + req.body.data.searchWord + "%" },
  //     },
  //     category: { [Op.like]: "%" + req.body.data.searchCategory + "%" },
  //   },
  // })
  //   .then((contents) => [res.send(contents)])
  //   .catch((err) => {
  //     res.send(err.message);
  //   });
});

module.exports = router;
