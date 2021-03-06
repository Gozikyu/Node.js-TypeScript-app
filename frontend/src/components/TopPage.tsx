import React, { VFC, useState, useEffect, useCallback } from "react";
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

const TopPage: VFC = () => {
  const initialUser = {
    id: 0,
    name: "initialState",
  };

  const [user, setUser] = useState(initialUser),
    [title, setTitle] = useState(""),
    [category, setCategory] = useState(""),
    [url, setUrl] = useState(""),
    [description, setDescription] = useState("");

  const inputTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  const inputCategory = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [setCategory]
  );

  const inputUrl = useCallback(
    (e) => {
      setUrl(e.target.value);
    },
    [setUrl]
  );

  const inputDescription = useCallback(
    (e) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );

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

  const submitData = useCallback(() => {
    axios
      .post("http://localhost:80/contents", {
        data: {
          userId: 1,
          title: title,
          category: category,
          url: url,
          description: description,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }, [title, category, url, description]);

  useEffect(() => {
    getUser();
  }, [getUser, isUser]);

  return (
    <div className="container">
      <div className={classes.root}>
        <TextField
          className={classes.textInput}
          fullWidth
          required
          variant="outlined"
          label="????????????"
          onChange={inputTitle}
          value={title}
        />
        <TextField
          className={classes.textInput}
          fullWidth
          required
          variant="outlined"
          label="????????????"
          value={category}
          onChange={inputCategory}
        />
        <TextField
          className={classes.textInput}
          fullWidth
          variant="outlined"
          label="??????????????????URL"
          value={url}
          onChange={inputUrl}
        />
        <TextField
          className={classes.textInput}
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="??????"
          value={description}
          onChange={inputDescription}
        />
        <Button
          className={classes.textInput}
          variant="contained"
          color="primary"
          onClick={submitData}
        >
          {console.log(title)}
          ??????
        </Button>
      </div>
    </div>
  );
};

export default TopPage;
