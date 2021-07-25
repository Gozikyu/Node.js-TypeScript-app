import React, { VFC, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const SearchForm: VFC = () => {
  const [searchWord, setSarchword] = useState(""),
    [searchCategory, setSearchCategory] = useState("");

  const searchingWord = () => {
    axios
      .post("http://localhost:80/contents/search", {
        data: {
          searchWord: searchWord,
          searchCategory: searchCategory,
        },
      })
      .then((contents) => {
        return contents;
      });
  };
  return <div></div>;
};

export default SearchForm;
