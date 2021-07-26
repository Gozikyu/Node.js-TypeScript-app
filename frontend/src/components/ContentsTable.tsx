import React, { VFC, useState } from "react";
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
import ReactPaginate from "react-paginate";
import firebase from "firebase";

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
  const [offset, setOffset] = useState(0);
  const perPage: number = 10;

  const classes = useStyles();

  const handlePageChange = (data: { selected: number }) => {
    let page_number = data["selected"];
    setOffset(page_number * perPage);
  };
  return (
    <>
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
            {contents.slice(offset, offset + perPage).map((content) => (
              <StyledTableRow>
                <StyledTableCell align="center">
                  {content.title}
                </StyledTableCell>
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

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={Math.ceil(contents.length / perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
        marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        onPageChange={handlePageChange} // クリック時のfunction
        containerClassName={"pagination"} // ページネーションであるulに着くクラス名
        // subContainerClassName={"pages pagination"}
        activeClassName={"active"} // アクティブなページのliに着くクラス名
        previousClassName={"pagination__previous"} // 「<」のliに着けるクラス名
        nextClassName={"pagination__next"} // 「>」のliに着けるクラス名
        disabledClassName={"pagination__disabled"} // 使用不可の「<,>」に着くクラス名
      />
    </>
  );
};

export default ContentsTable;
