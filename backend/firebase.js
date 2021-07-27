var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyC4Hn1dS3zSomUAgLQCsQCwzD9j0SHr22o",
  authDomain: "node-typescript-app.firebaseapp.com",
  projectId: "node-typescript-app",
  storageBucket: "node-typescript-app.appspot.com",
  messagingSenderId: "1023303912172",
  appId: "1:1023303912172:web:84f403977326d59f8ff3c9",
  measurementId: "G-4WV0E03MFD",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

module.exports = auth;
