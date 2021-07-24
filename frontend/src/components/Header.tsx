import { VFC, useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
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
  const [user, setUser] = useState<User>();

  const history = useHistory();
  const location = useLocation();

  const classes = useStyles();

  type User = {
    id: number;
    name: string;
  };

  const isUser = useCallback((arg: any): arg is User => {
    if (arg.id && arg.name) {
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
        console.log(res.data);
        if (isUser(res.data)) setUser(res.data);
      });
  }, [isUser]);

  const pushToContentPage = () => {
    history.push("/contents");
  };

  const pushToTopPage = () => {
    history.push("/");
  };

  useEffect(() => {
    getUser();
  }, [getUser, isUser]);

  return user !== undefined ? (
    <div className={classes.root}>
      <p className={classes.userName}> {user.name}</p>
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
