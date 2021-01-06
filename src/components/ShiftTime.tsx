import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function createData(title: string, startTime: string, endTime: string) {
  return { title, startTime, endTime };
}

const rows = [
  createData("早番", "11:30", "21:00"),
  createData("遅番", "13:30", "23:00"),
];

export default function ShiftTime() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">シフト名</TableCell>
            <TableCell align="center">開始</TableCell>
            <TableCell align="center">終了</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.startTime}</TableCell>
              <TableCell align="center">{row.endTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
