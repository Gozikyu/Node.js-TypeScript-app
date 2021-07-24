import React, { VFC, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { ContentsTable } from "./index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      width: "80%",
    },
  })
);

const Contents: VFC = () => {
  const [contents, setContents] = useState<GivingContent[]>();

  const classes = useStyles();

  type Content = {
    id: number;
    userId: number;
    title: string;
    url: string;
    category: string;
    description: string;
  };

  type GivingContent = {
    title: string;
    url: string;
    category: string;
    description: string;
  };

  const isContent = (arg: any): arg is Content => {
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
  };

  const newArray: GivingContent[] = [];
  const getContents = () => {
    axios
      .get("http://localhost:80/contents", {
        withCredentials: true,
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          res.data.map((content) => {
            if (isContent(content)) {
              newArray.push({
                title: content.title,
                category: content.category,
                url: content.url,
                description: content.description,
              });
            }
          });
          setContents(newArray);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getContents, []);

  return contents ? (
    <div className={classes.root}>
      <ContentsTable contents={contents} />
    </div>
  ) : (
    <></>
  );
};

export default Contents;
