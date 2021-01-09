import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 300,
  },
  headCell: {
    backgroundColor: "#5AAA95",
    color: "white",
    fontWeight: "bold",
  },
});

export default function BasicTable(props) {
  const classes = useStyles();
  var checkArray = {};
  for (var iDate = 1; iDate <= 28; iDate++) {
    checkArray[iDate] = "0";
  }
  var dates = [];
  for (iDate = 1; iDate <= 28; iDate++) {
    dates.push(iDate);
  }
  const [checks, setChecks] = React.useState(checkArray);
  const shiftTypes = JSON.parse(props.shiftTypes);

  React.useEffect(() => {
    var workShifts = localStorage.getItem("work-shifts");
    if (workShifts) {
      workShifts = JSON.parse(workShifts);
      setChecks(workShifts);
    }
  }, []);

  function handleChange(event: any, newValue) {
    // console.log(newValue);
    setChecks({ ...checks, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Typography align="center" variant="h6" component="h6" gutterBottom>
        {props.year}年{props.month}月のシフトを
        あなたのGoogleCalendarに登録しよう！
      </Typography>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headCell} align="center">
                日
              </TableCell>
              <TableCell className={classes.headCell} align="center">
                {shiftTypes[1]["title"]}
              </TableCell>
              <TableCell className={classes.headCell} align="center">
                {shiftTypes[2]["title"]}
              </TableCell>
              <TableCell className={classes.headCell} align="center">
                休み
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dates.map((date) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ width: "100%" }}>
        <EventInsertToGoogleCalendarButton
          onClickHandler={() => {
            // props.onClickHandler();
            localStorage.setItem("shift-types", JSON.stringify(shiftTypes));
            localStorage.setItem("work-shifts", JSON.stringify(checks));
          }}
        />
      </div>
    </>
  );
}
