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

const ContentsTable: VFC<{ contents: Content[] }> = ({ contents }) => {
  const classes = useStyles();
  console.log(contents[0]);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>タイトル</StyledTableCell>
            <StyledTableCell align="right">カテゴリー</StyledTableCell>
            <StyledTableCell align="right">URL</StyledTableCell>
            <StyledTableCell align="right">説明</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((content) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {content.title}
              </StyledTableCell>
              {/* <StyledTableCell align="right">{content.title}</StyledTableCell> */}
              <StyledTableCell align="right">
                {content.category}
              </StyledTableCell>
              <StyledTableCell align="right">{content.url}</StyledTableCell>
              <StyledTableCell align="right">
                {content.description}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContentsTable;
