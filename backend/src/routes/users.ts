import express from "express";
let router = express.Router();
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

type User = {
  uid: string | undefined;
  email: string | undefined;
  name?: string | undefined;
};

// 型ガード用の関数。type Userの属性を持っていればtrueを返し、引数の型をUser似設定。
const isUser = (arg: any): arg is User => {
  if (typeof arg.uid == "string" && typeof arg.email == "string") {
    return true;
  } else {
    return false;
  }
};

const userCollection = firebase.firestore().collection("users");

// firebase Authにログイン状況を問い合わせ、ログインしていれば更にfirestoreから取得したログインユーザーのデータを返す。
router.get("/loginUser", async (req, res, next) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      userCollection
        .doc(user.uid)
        .get()
        .then((user_at_firestore) => {
          res.status(200).json({ user: user_at_firestore.data() });
        });
    } else {
      console.log("ログインしてください");
      res.status(500).json({ message: "ログインしてください" });
    }
  });
});

// firebase Authでユーザ認証、認証が通れば、そのユーザーの情報をfirestoreから取得し返す。
router.post("/signin", function (req, res, next) {
  auth
    .signInWithEmailAndPassword(req.body.data.email, req.body.data.pass)
    .then((result) => {
      const user = result.user;
      user &&
        userCollection
          .doc(user.uid)
          .get()
          .then((user_at_firestore) => {
            return res.status(200).json({ user: user_at_firestore.data() });
          });
    })
    .catch((err) => {
      console.log(err);
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
        userCollection
          .doc(userData.uid)
          .set(userData)
          // setの返り値はPromise<void>
          .then(() => {
            res.status(200).json({ message: "ユーザー登録に成功しました" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "ユーザー登録に失敗しました" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

export default router;
