import { VFC, useState, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import axios from "axios";

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

  const submitUserInfo = () => {
    axios
      .post("http://localhost:80/users", {
        data: {
          name: name,
          email: email,
          pass: pass,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("ユーザー登録しました");
        } else {
          alert("ユーザー登録に失敗しました");
        }
      })
      .catch((err) => {
        alert(err);
      })
      .then(() => {});
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
