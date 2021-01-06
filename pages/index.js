import { useRouter } from "next/router";
import React from "react";
import DateTable from "../src/DateTable";

export default function Home() {
  const router = useRouter();
  const GOOGLE_CALENDAR_AUTH_CODE = router.query.code
    ? router.query.code
    : null;
  const TITLE_HAYA = "早番";
  const TITLE_OSO = "遅番";
  const START_TIME_HAYA = "11:30:00";
  const START_TIME_OSO = "13:30:00";
  const END_TIME_HAYA = "21:00:00";
  const END_TIME_OSO = "23:00:00";
  const COLOR_ID_HAYA = "2";
  const COLOR_ID_OSO = "10";
  const YEAR = 2021;
  const MONTH = 2;
  var data = {};
  const [backdropOpen, setBackdropOpen] = React.useState(false);

  React.useEffect(() => {
    // authCodeをアクセストークンに変換
    const getAccessToken = async (authCode) => {
      var url = "https://accounts.google.com/o/oauth2/token";
      var data = {
        client_id:
          "697184433971-mp8k45hsejd45k18gkltetn2fgh63rr3.apps.googleusercontent.com",
        client_secret: "K4ywtPu0NBG5MyBG533jOMH6",
        redirect_uri: "http://localhost:3000?event=insert",
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
            for (var iIndex = 1; iIndex < workShiftLength; iIndex++) {
              switch (workShifts[iIndex]) {
                case "1" /* 早番の時 */:
                  data = {
                    start: {
                      dateTime: `${YEAR}-${MONTH}-${iIndex}T${START_TIME_HAYA}+09:00`,
                    },
                    end: {
                      dateTime: `${YEAR}-${MONTH}-${iIndex}T${END_TIME_HAYA}+09:00`,
                    },
                    summary: TITLE_HAYA,
                    colorId: COLOR_ID_HAYA,
                  };
                  insertEvent(accessToken, data);
                  // insertEvent(accessToken, data).then((value) => {
                  //   console.log(value);
                  // });
                  continue;
                case "2" /* 遅番の時 */:
                  data = {
                    start: {
                      dateTime: `${YEAR}-${MONTH}-${iIndex}T${START_TIME_OSO}+09:00`,
                    },
                    end: {
                      dateTime: `${YEAR}-${MONTH}-${iIndex}T${END_TIME_OSO}+09:00`,
                    },
                    summary: TITLE_OSO,
                    colorId: COLOR_ID_OSO,
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
          console.log(resolve);
        }
      );
    }
  });

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1>シフト登録</h1>
      <b>シフト勤務時間</b>
      <p>
        早番：{START_TIME_HAYA} - {END_TIME_HAYA}
      </p>
      <p>
        遅番：{START_TIME_OSO} - {END_TIME_OSO}
      </p>
      <b>年月</b>
      <p>
        {YEAR}年{MONTH}月
      </p>
      <div>
        <DateTable />
      </div>
    </div>
  );
}
