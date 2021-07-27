import { VFC, useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "3rem",
      backgroundColor: "#008b8b",
      marginBottom: "1rem",
    },
    userName: {
      fontSize: "2rem",
      float: "left",
      height: "3rem",
      margin: "0 0 0 1rem",
    },
    button: {
      float: "right",
      height: "3rem",
      marginRight: "1rem",
    },
  })
);

const Header = () => {
  const [user, setUser] = useState<User>({
    uid: undefined,
    email: undefined,
    name: undefined,
  });

  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const value = useAuthContext();

  console.log(value);

  type User = {
    uid: string | undefined;
    email: string | undefined;
    name: string | undefined;
  };

  const isUser = useCallback((arg: any): arg is User => {
    if (
      typeof arg.uid == "string" &&
      typeof arg.email == "string" &&
      typeof arg.name == "string"
    ) {
      return true;
    } else {
      return false;
    }
  }, []);

  const getUser = useCallback(() => {
    axios
      .get("http://localhost:80/users", {
        withCredentials: true,
      })
      .then((res) => {
        if (isUser(res.data)) setUser(res.data);
      });
  }, [isUser]);

  const pushToContentPage = () => {
    history.push("/contents");
  };

  const pushToTopPage = () => {
    history.push("/");
  };

  const checkLogin = () => {
    console.log("check");
    axios.get("http://localhost:80/users/loginUser").then((user) => {
      if (isUser(user.data)) {
        setUser(user.data);
        console.log(user.data);
      } else {
        console.log("User型ではありません");
        console.log(user);
      }
    });
  };

  useEffect(checkLogin, []);

  useEffect(() => {
    getUser();
  }, [getUser, isUser]);

  return user !== undefined ? (
    <div className={classes.root}>
      <p className={classes.userName}>
        {user.name ? user.name : "ログインしてください"}
      </p>
      {location.pathname == "/" ? (
        <Button className={classes.button} onClick={pushToContentPage}>
          ワード検索ページヘ
        </Button>
      ) : (
        <Button className={classes.button} onClick={pushToTopPage}>
          ワード登録ページへ
        </Button>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Header;
