const { response } = require("express");
var express = require("express");
var router = express.Router();
const db = require("../models/index");
let auth = require("../firebase.js");
const firebase = require("firebase/app");
require("firebase/firestore");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   db.User.findByPk(1).then((user) => {
//     let data = {
//       title: "data",
//       user: user,
//     };
//     res.json(user);
//   });
// });

router.get("/loginUser", async (req, res, next) => {
  auth.onAuthStateChanged((snapshot) => {
    if (snapshot) {
      firebase
        .firestore()
        .collection("users")
        .doc(snapshot.uid)
        .get()
        .then((user) => {
          res.json(user.data());
        });
    } else {
      console.log("ログインしてください");
    }
  });
});

router.post("/signin", function (req, res, next) {
  auth
    .signInWithEmailAndPassword(req.body.data.email, req.body.data.pass)
    .then((user) => {
      res.send("signin successfully ");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", function (req, res, next) {
  auth
    .createUserWithEmailAndPassword(req.body.data.email, req.body.data.pass)
    .then((result) => {
      const registerdUser = result.user;

      const userData = {
        name: req.body.data.name,
        email: req.body.data.email,
        uid: registerdUser.uid,
      };
      console.log(registerdUser);
      firebase.firestore().collection("users").doc(userData.uid).set(userData);
    });
});

module.exports = router;
