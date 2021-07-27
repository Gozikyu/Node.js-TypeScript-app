import React, { VFC, useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      width: "80%",
    },
    textInput: {
      marginTop: "1rem",
    },
  })
);

const SignUp: VFC = () => {
  const [email, setEmail] = useState(""),
    [pass, setPass] = useState(""),
    [name, setName] = useState("");

  const classes = useStyles();

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const inputName = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const inputPass = useCallback(
    (e) => {
      setPass(e.target.value);
    },
    [setPass]
  );

  type User = {
    name: string | undefined;
    email: string | undefined;
    id: string | undefined;
  };

  const isUser = (arg: any): arg is User => {
    if (arg !== null && typeof arg.email === "string") {
      return true;
    } else {
      return false;
    }
  };
  const submitUserInfo = () => {
    axios.post("http://localhost:80/users").then((user) => {
      console.log(user);
    });
    // auth.createUserWithEmailAndPassword(email, pass).then((result) => {
    //   const registerdUser = result.user;
    //   if (isUser(registerdUser)) {
    //     const userData = {
    //       name: name,
    //       email: email,
    //       uid: registerdUser.uid,
    //     };
    //     console.log(registerdUser);
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(userData.uid)
    //       .set(userData);
    //   }
    // });
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textInput}
        fullWidth
        required
        variant="outlined"
        label="名前"
        onChange={inputName}
        value={name}
      />

      <TextField
        className={classes.textInput}
        fullWidth
        required
        variant="outlined"
        label="メールアドレス"
        onChange={inputEmail}
        value={email}
      />
      <TextField
        className={classes.textInput}
        fullWidth
        required
        variant="outlined"
        label="パスワード"
        onChange={inputPass}
        value={pass}
      />
      <Button
        className={classes.textInput}
        variant="contained"
        color="primary"
        onClick={submitUserInfo}
      >
        ユーザー登録
      </Button>
    </div>
  );
};

export default SignUp;
