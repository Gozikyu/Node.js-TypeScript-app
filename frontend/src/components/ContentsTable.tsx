import React, { VFC } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
  },
  table: {
    minWidth: 700,
  },
});

type Content = {
  title: string;
  url: string;
  category: string;
  description: string;
};

const cutDescription = (description: string): string => {
  if (description.length > 25) {
    description = description.substr(0, 25) + "...";
    return description;
  } else {
    return description;
  }
};

const ContentsTable: VFC<{ contents: Content[] }> = ({ contents }) => {
  const classes = useStyles();
  console.log(contents[0]);
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">タイトル</StyledTableCell>
            <StyledTableCell align="center">カテゴリー</StyledTableCell>
            <StyledTableCell align="center">URL</StyledTableCell>
            <StyledTableCell align="center">説明</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((content) => (
            <StyledTableRow>
              <StyledTableCell align="center">{content.title}</StyledTableCell>
              {/* <StyledTableCell align="right">{content.title}</StyledTableCell> */}
              <StyledTableCell align="center">
                {content.category}
              </StyledTableCell>
              <StyledTableCell align="center">
                <a href={content.url}>参考サイトへ</a>
              </StyledTableCell>
              <StyledTableCell align="center">
                {cutDescription(content.description)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContentsTable;
