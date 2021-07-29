import { response } from "express";
import express from "express";
let router = express.Router();
// import db from "../models/index";
import auth from "../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

type User = {
  uid: string | undefined;
  email: string | undefined;
  name?: string | undefined;
};

const isUser = (arg: any): arg is User => {
  if (typeof arg.uid == "string" && typeof arg.email == "string") {
    return true;
  } else {
    return false;
  }
};

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
      res.json(null);
    }
  });
});

router.post("/signin", function (req, res, next) {
  auth
    .signInWithEmailAndPassword(req.body.data.email, req.body.data.pass)
    .then((result) => {
      const user = result.user;
      console.log(user && user.uid);
      user &&
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((user) => {
            return res.status(200).json({ user: user.data() });
          });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

router.post("/", function (req, res, next) {
  auth
    .createUserWithEmailAndPassword(req.body.data.email, req.body.data.pass)
    .then((result) => {
      const registerdUser = result.user;

      if (registerdUser) {
        const userData = {
          name: req.body.data.name,
          email: req.body.data.email,
          uid: registerdUser.uid,
        };
        firebase
          .firestore()
          .collection("users")
          .doc(userData.uid)
          .set(userData)
          .then((reslut) => {
            const user = result.user;
            if (isUser(user)) {
              res.json({ status: "200", user: user });
            } else {
              res.json({ status: "500", message: user });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({ status: "500", message: err });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "500", message: err });
    });
});

export default router;
