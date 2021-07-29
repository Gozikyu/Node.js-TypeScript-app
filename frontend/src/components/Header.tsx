import { VFC, useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
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

type User = {
  uid: string | undefined;
  email: string | undefined;
  name: string | undefined;
};

const Header: VFC<{ loginUser: User }> = ({ loginUser }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const pushToContentPage = () => {
    history.push("/contents");
  };

  const pushToTopPage = () => {
    history.push("/");
  };
  console.log(loginUser.uid);

  return (
    <div className={classes.root}>
      <p className={classes.userName}>
        {loginUser.name ? loginUser.name : "ログインしてください"}
      </p>

      {loginUser.uid ? (
        location.pathname === "/" ? (
          <Button className={classes.button} onClick={pushToContentPage}>
            ワード検索ページヘ
          </Button>
        ) : (
          <Button className={classes.button} onClick={pushToTopPage}>
            ワード登録ページへ
          </Button>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
