import React, { VFC, useState, useEffect, useCallback, useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/firestore";
import { ContentsTable } from "./index";

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

const Contents: VFC = () => {
  const [contents, setContents] = useState<Content[]>(),
    [searchWord, setSearchWord] = useState(""),
    [searchCategory, setSearchCategory] = useState("");

  const classes = useStyles();

  type Content = {
    id: number;
    userId: number;
    title: string;
    url: string;
    category: string;
    description: string;
  };

  const inputSearchWord = useCallback(
    (e) => {
      setSearchWord(e.target.value);
    },
    [setSearchWord]
  );

  const inputSearchCategory = useCallback(
    (e) => {
      setSearchCategory(e.target.value);
    },
    [setSearchCategory]
  );

  const isContent = useCallback((arg: any): arg is Content => {
    if (
      typeof arg.id === "number" &&
      typeof arg.userId === "number" &&
      typeof arg.title === "string" &&
      typeof arg.url === "string" &&
      typeof arg.category === "string" &&
      typeof arg.description === "string"
    ) {
      return true;
    } else {
      return false;
    }
  }, []);

  const searchingWord = () => {
    axios
      .post("http://localhost:80/contents/search", {
        data: {
          searchWord: searchWord,
          searchCategory: searchCategory,
        },
      })
      .then((res) => {
        console.log(res.data);
        setContents(res.data);
      });
  };

  let gotData: any[] = [];
  const getContents = () => {
    axios.get("http://localhost:80/contents");
    // firebase
    //   .firestore()
    //   .collection("contents")
    //   .get()
    //   .then((gotContents) => {
    //     gotContents.docs.map((gotContent) => {
    //       gotData.push(gotContent.data());
    //     });
    //     setContents(gotData);
    //   });
  };

  useEffect(getContents, [gotData]);

  return contents ? (
    <div className={classes.root}>
      <TextField
        className={classes.textInput}
        fullWidth
        variant="outlined"
        label="検索ワード"
        onChange={inputSearchWord}
        value={searchWord}
      />
      <TextField
        className={classes.textInput}
        fullWidth
        variant="outlined"
        label="検索カテゴリー"
        onChange={inputSearchCategory}
        value={searchCategory}
      />
      <Button
        className={classes.textInput}
        variant="contained"
        color="primary"
        onClick={searchingWord}
      >
        検索
      </Button>

      <ContentsTable contents={contents} />
    </div>
  ) : (
    <></>
  );
};

export default Contents;
