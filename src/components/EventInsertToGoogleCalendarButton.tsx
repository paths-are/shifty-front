import React from "react";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const EventInsertToGoogleCalendarButton = (props) => {
  const router = useRouter();
  const url = "https://accounts.google.com/o/oauth2/auth";
  const clientId =
    "697184433971-mp8k45hsejd45k18gkltetn2fgh63rr3.apps.googleusercontent.com";
  const redirectUri = "http://localhost:3000?event=insert";
  const scope = "https://www.googleapis.com/auth/calendar";
  const authUrl =
    `${url}` +
    `?` +
    `client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=${scope}` +
    `&response_type=code` +
    `&approval_prompt=force` +
    `&access_type=offline`;

  return (
    // <Button variant="contained" color="primary">
    //   Primary
    // </Button>
    <Button
      variant="contained"
      // variant="outlined"
      style={{ float: "right", margin: "10px 0" }}
      color="primary"
      onClick={() => {
        props.onClickHandler();
        router.push(authUrl);
      }}
    >
      Google Calendar 登録
    </Button>
  );
};
export default EventInsertToGoogleCalendarButton;
