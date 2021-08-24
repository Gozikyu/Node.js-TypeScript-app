import { VFC, useState, useCallback } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

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

type User = {
  uid: string | undefined;
  email: string | undefined;
  name: string | undefined;
};

const SignIn: VFC<{ setUser: (user: User) => void }> = ({ setUser }) => {
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

  const isUser = useCallback((arg: any): arg is User => {
    if (
      arg !== null &&
      typeof arg.uid == "string" &&
      typeof arg.email == "string" &&
      typeof arg.name == "string"
    ) {
      return true;
    } else {
      return false;
    }
  }, []);

  const signIn = async () => {
    axios
      .post("http://localhost:80/users/signin", {
        data: {
          email: email,
          pass: pass,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          if (isUser(res.data.user)) {
            setUser(res.data.user);
            console.log(res);
            alert("サインインしました");
          }
        } else {
          alert("サインインに失敗しました");
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err.message);
      });
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
        onClick={signIn}
      >
        ログイン
      </Button>

      <p>
        <a href="/signup">ユーザー登録はこちら</a>
      </p>
    </div>
  );
};

export default SignIn;
