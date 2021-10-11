import { useRouter } from "next/router";
import React from "react";
import BasicTable from "../src/components/BasicTable";
import ShiftTypesForm from "../src/components/ShiftTypesForm";
import AppHeader from "../src/components/AppHeader";
// import Firebase from "../src/components/Firebase";
import { isPropertyAccessChain } from "typescript";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Home() {
  const router = useRouter();
  const GOOGLE_CALENDAR_AUTH_CODE = router.query.code
    ? router.query.code
    : null;
  const OPEN_EXTERNAL_BROWSER = router.query.openExternalBrowser
    ? router.query.openExternalBrowser
    : null;
  const [shiftTypes, setShiftTypes] = React.useState({
    1: {
      title: "早番",
      startTime: "11:30:00",
      endTime: "21:00:00",
      colorId: "2",
    },
    2: {
      title: "遅番",
      startTime: "13:30:00",
      endTime: "23:00:00",
      colorId: "10",
    },
  });
  const YEAR = 2021;
  // const MONTH = 6;
  var data = {};

  const classes = useStyles();
  const [month, setMonth] = React.useState(null);

  const handleChange = (event) => {
    localStorage.setItem("shift-month", event.target.value);
    setMonth(event.target.value);
  };

  React.useEffect(() => {
    if (OPEN_EXTERNAL_BROWSER) {
      router.push("./");
    }

    // authCodeをアクセストークンに変換
    const getAccessToken = async (authCode) => {
      const hostName =
        location.hostname === "localhost"
          ? "localhost:3000"
          : location.hostname;
      var url = "https://accounts.google.com/o/oauth2/token";
      var data = {
        client_id:
          "697184433971-mp8k45hsejd45k18gkltetn2fgh63rr3.apps.googleusercontent.com",
        client_secret: "K4ywtPu0NBG5MyBG533jOMH6",
        redirect_uri: `http://${hostName}?event=insert`,
        grant_type: "authorization_code",
        code: authCode,
      };
      const response = await fetch(url, {
        method: "POST",
        // mode: "cors",
        // cache: "no-cache",
        // credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        // redirect: "follow",
        // referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      const responseJson = await response.json();
      return responseJson.access_token;
    };

    // アクセストークンを使ってカレンダーに登録
    const insertEvent = async (accessToken, data = {}) => {
      var url =
        "https://www.googleapis.com/calendar/v3/calendars/primary/events";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseJson = await response.json();
      return responseJson;
    };

    if (GOOGLE_CALENDAR_AUTH_CODE) {
      getAccessToken(GOOGLE_CALENDAR_AUTH_CODE).then(
        (accessToken) => {
          if (accessToken) {
            var workShifts = localStorage.getItem("work-shifts");
            if (workShifts) {
              workShifts = JSON.parse(workShifts);
            }
            var workShiftLength = Object.keys(workShifts).length;
            for (var iIndex = 1; iIndex <= workShiftLength; iIndex++) {
              switch (workShifts[iIndex]) {
                case "1" /* 早番の時 */:
                  data = {
                    start: {
                      dateTime: `${YEAR}-${month}-${iIndex}T${shiftTypes[1]["startTime"]}+09:00`,
                    },
                    end: {
                      dateTime: `${YEAR}-${month}-${iIndex}T${shiftTypes[1]["endTime"]}+09:00`,
                    },
                    summary: shiftTypes[1]["title"],
                    colorId: shiftTypes[1]["colorId"],
                  };
                  insertEvent(accessToken, data);
                  // insertEvent(accessToken, data).then((value) => {
                  //   console.log(value);
                  // });
                  continue;
                case "2" /* 遅番の時 */:
                  data = {
                    start: {
                      dateTime: `${YEAR}-${month}-${iIndex}T${shiftTypes[2]["startTime"]}+09:00`,
                    },
                    end: {
                      dateTime: `${YEAR}-${month}-${iIndex}T${shiftTypes[2]["endTime"]}+09:00`,
                    },
                    summary: shiftTypes[2]["title"],
                    colorId: shiftTypes[2]["colorId"],
                  };
                  insertEvent(accessToken, data);
                  continue;
                case "0" /* 休みの時 */:
                  continue;
              }
            }
            router.push("/");
          }
        },
        (resolve) => {
          // console.log(resolve);
        }
      );
    }
  });

  React.useEffect(() => {
    var wbsSiftTypes = localStorage.getItem("shift-types");
    var shiftMonth = localStorage.getItem("shift-month");
    if (wbsSiftTypes) {
      wbsSiftTypes = JSON.parse(wbsSiftTypes);
      setShiftTypes(wbsSiftTypes);
    }
    if (shiftMonth) {
      setMonth(shiftMonth);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("shift-types", JSON.stringify(shiftTypes));
    // console.log(localStorage.getItem("shift-types"));
  }, [shiftTypes]);

  const handleChangeShiftTypes = (event, label) => {
    if (event.target.name === "1") {
      if (label === "タイトル") {
        setShiftTypes({
          ...shiftTypes,
          [1]: { ...shiftTypes[1], title: event.target.value },
        });
      }
      if (label === "開始") {
        setShiftTypes({
          ...shiftTypes,
          [1]: { ...shiftTypes[1], startTime: event.target.value },
        });
      }
      if (label === "終了") {
        setShiftTypes({
          ...shiftTypes,
          [1]: { ...shiftTypes[1], endTime: event.target.value },
        });
      }
    }
    if (event.target.name === "2") {
      if (label === "タイトル") {
        setShiftTypes({
          ...shiftTypes,
          [2]: { ...shiftTypes[2], title: event.target.value },
        });
      }
      if (label === "開始") {
        setShiftTypes({
          ...shiftTypes,
          [2]: { ...shiftTypes[2], startTime: event.target.value },
        });
      }
      if (label === "終了") {
        setShiftTypes({
          ...shiftTypes,
          [2]: { ...shiftTypes[2], endTime: event.target.value },
        });
      }
    }
  };

  return (
    <div>
      <AppHeader>
        <ShiftTypesForm
          shiftTypes={JSON.stringify(shiftTypes)}
          handleChange={handleChangeShiftTypes}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">月</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>

        <BasicTable
          year={YEAR}
          month={month}
          shiftTypes={JSON.stringify(shiftTypes)}
          // onClickHandler={() => {
          //   localStorage.setItem("shift-types", JSON.stringify(shiftTypes));
          // }}
        />
      </AppHeader>
      {process.env.assetPrefix}
    </div>
  );
}
