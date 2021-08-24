import { VFC, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../Router";

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

const Header: VFC = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const user = useContext(AuthContext);

  const pushToContentPage = () => {
    history.push("/contents");
  };

  const pushToTopPage = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <p className={classes.userName}>
        {user.name ? user.name : "ログインしてください"}
      </p>

      {user.uid ? (
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
