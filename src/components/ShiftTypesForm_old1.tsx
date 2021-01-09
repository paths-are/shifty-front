import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import EventInsertToGoogleCalendarButton from "./EventInsertToGoogleCalendarButton";
import Typography from "@material-ui/core/Typography";

const workTimes = [
  {
    value: "11:30:00",
    label: "11:30",
  },
  {
    value: "13:30:00",
    label: "13:30",
  },
  {
    value: "21:00:00",
    label: "21:00",
  },
  {
    value: "23:00:00",
    label: "23:00",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25%",
      },
    },
    container: {
      maxHeight: 440,
    },
    tableRoot: {
      minWidth: 300,
      "& .MuiTextField-root": {
        // margin: theme.spacing(1),
        width: "100%",
      },
    },
    headCell: {
      backgroundColor: "#5AAA95",
      color: "white",
      fontWeight: "bold",
    },
  })
);

export default function ShiftTypesForm(props) {
  const classes = useStyles();
  const [workTimesState, setWorkTimesState] = React.useState({
    startHaya: "11:30:00",
    endHaya: "21:00:00",
    startOso: "13:30:00",
    endOso: "23:00:00",
  });
  // console.log(workTimesState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkTimesState({
      ...workTimesState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <TableContainer className={classes.container} component={Paper}>
        <Table
          className={classes.tableRoot}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.headCell} align="center">
                タイトル
              </TableCell>
              <TableCell className={classes.headCell} align="center">
                開始
              </TableCell>
              <TableCell className={classes.headCell} align="center">
                終了
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={1}>
              <TableCell align="center">
                <TextField
                  required
                  id="standard-required"
                  defaultValue="早番"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
            {/* {dates.map((date) => (
              <TableRow key={date}>
                <TableCell align="center">{date}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={checks[date] === "1"}
                    name={date.toString()}
                    value="1" // haya
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={checks[date] === "2"}
                    name={date.toString()}
                    value="2" // oso
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={checks[date] === "0"}
                    name={date.toString()}
                    value="0" // yasumi
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
