import React, { VFC, useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { auth } from "../firebase";

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
    [pass, setPass] = useState("");

  const classes = useStyles();

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const inputPass = useCallback(
    (e) => {
      setPass(e.target.value);
    },
    [setPass]
  );

  const submitUserInfo = () => {
    auth.createUserWithEmailAndPassword(email, pass);
  };

  return (
    <div className={classes.root}>
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
