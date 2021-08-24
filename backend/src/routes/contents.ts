import express from "express";
let router = express.Router();
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../firebase";
import dotenv from "dotenv";

dotenv.config();

// Initialize Cloud Firestore through Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: String(process.env.apikey),
//     authDomain: String(process.env.authDomain),
//     projectId: String(process.env.projectId),
//   });
// }

// let db = firebase.firestore();

type Content = {
  title: string;
  url: string;
  category: string;
  description: string;
};

const isContent = (arg: any): arg is Content => {
  if (
    typeof arg.title === "string" &&
    typeof arg.url === "string" &&
    typeof arg.category === "string" &&
    typeof arg.description === "string"
  ) {
    return true;
  } else {
    return false;
  }
};

/* GET users listing. */
router.get("/", async (req, res, next) => {
  let contents: Content[] = [];
  const snapshot = await db.collection("contents").get();
  snapshot.docs.map((content) => {
    const data = content.data();
    console.log(data);
    if (isContent(data)) {
      contents.push(data);
    }
  });
  res.json(contents);
});

router.post("/", async (req, res, next) => {
  console.log("いいいいいいいいいいいいいいい");
  const snapshot = await db.collection("contents");
  const data = {
    uid: req.body.data.uid,
    title: req.body.data.title,
    category: req.body.data.category,
    url: req.body.data.url,
    description: req.body.data.description,
  };

  try {
    const addedData = await snapshot.doc().set(data);
    console.log(addedData);
    res.json(addedData);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

router.post("/search", async (req, res, next) => {
  let contents: Content[] = [];
  const snapshot = await db.collection("contents").get();
  await snapshot.docs.map((content) => {
    const data = content.data();
    if (isContent(data)) {
      contents.push(data);
    }
  });

  let filtered = contents.filter((content) => {
    return (
      (content.title.includes(req.body.data.searchWord) ||
        content.description.includes(req.body.data.searchWord)) &&
      content.category.includes(req.body.data.searchCategory)
    );
  });

  res.json(filtered);
});

export default router;
