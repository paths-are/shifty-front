import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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
    paper: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25%",
      },
    },
    textFieldContainer: {
      // display: "-webkit-flex",
      display: "flex",
      // -webkit-justify-content: "center",
      justifyContent: "center",
      // -webkit-align-items: "stretch",
      alignItems: "stretch",
    },
  })
);

export default function ShiftTypesForm(props) {
  const classes = useStyles();
  const shiftTypes = JSON.parse(props.shiftTypes);

  return (
    <>
      <Paper className={classes.paper} elevation={1}>
        <Typography align="center">
          タイトル、開始時間、終了時間を設定しよう
        </Typography>
        {/* <Typography align="left">シフト</Typography> */}
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.textFieldContainer}>
            <TextField
              required
              id="standard-required"
              name="1"
              label="タイトル"
              // defaultValue="早番"
              value={shiftTypes[1]["title"]}
              onChange={(e) => {
                props.handleChange(e, "タイトル");
              }}
              size="small"
              variant="outlined"
            />
            <TextField
              id="outlined-select-workTimeStart"
              select
              name="1"
              label="開始"
              value={shiftTypes[1]["startTime"]}
              onChange={(e) => {
                props.handleChange(e, "開始");
              }}
              variant="outlined"
              size="small"
            >
              {workTimes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-workTimeEnd"
              select
              name="1"
              label="終了"
              value={shiftTypes[1]["endTime"]}
              onChange={(e) => {
                props.handleChange(e, "終了");
              }}
              variant="outlined"
              size="small"
            >
              {workTimes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.textFieldContainer}>
            <TextField
              required
              id="standard-required"
              name="2"
              label="タイトル"
              // defaultValue="遅番"
              value={shiftTypes[2]["title"]}
              onChange={(e) => {
                props.handleChange(e, "タイトル");
              }}
              size="small"
              variant="outlined"
            />
            <TextField
              id="outlined-select-workTimeStart"
              select
              name="2"
              label="開始"
              value={shiftTypes[2]["startTime"]}
              onChange={(e) => {
                props.handleChange(e, "開始");
              }}
              variant="outlined"
              size="small"
            >
              {workTimes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-workTimeEnd"
              select
              name="2"
              label="終了"
              value={shiftTypes[2]["endTime"]}
              onChange={(e) => {
                props.handleChange(e, "終了");
              }}
              variant="outlined"
              size="small"
            >
              {workTimes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </Paper>
    </>
  );
}
