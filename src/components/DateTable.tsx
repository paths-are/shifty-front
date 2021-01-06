import * as React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import EventInsertToGoogleCalendarButton from "./EventInsertToGoogleCalendarButton";

export default function DateTable() {
  var checkArray = {};
  for (var iDate = 1; iDate <= 28; iDate++) {
    checkArray[iDate] = "0";
  }
  var dates = [];
  for (iDate = 1; iDate <= 28; iDate++) {
    dates.push(iDate);
  }
  const [checks, setChecks] = React.useState(checkArray);
  React.useEffect(() => {
    var workShifts = localStorage.getItem("work-shifts");
    if (workShifts) {
      workShifts = JSON.parse(workShifts);
      setChecks(workShifts);
    }
  }, []);
  function handleChange(event: any) {
    setChecks({ ...checks, [event.target.name]: event.target.value });
  }
  return (
    <>
      <table className="table" style={{ border: "0.1px solid grey" }}>
        <tr>
          <th>日</th>
          <th>早番</th>
          <th>遅番</th>
          <th>休み</th>
        </tr>
        {dates.map((date) => {
          return (
            <tr>
              <td>{date}</td>
              <td>
                <Checkbox
                  checked={checks[date] === "1"}
                  name={date.toString()}
                  value="1" // haya
                  onChange={handleChange}
                />
              </td>
              <td>
                <Checkbox
                  checked={checks[date] === "2"}
                  name={date.toString()}
                  value="2" // oso
                  onChange={handleChange}
                />
              </td>
              <td>
                <Checkbox
                  checked={checks[date] === "0"}
                  name={date.toString()}
                  value="0" // yasumi
                  onChange={handleChange}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <EventInsertToGoogleCalendarButton
        onClickHandler={() => {
          localStorage.setItem("work-shifts", JSON.stringify(checks));
        }}
      />
    </>
  );
}
