import React from "react";
import { CalendarProps } from "../../models/models";
import { isValid, parse, format } from "date-fns";
import TextField from "@material-ui/core/TextField";

export const DateInput: React.FC<CalendarProps> = ({
  date,
  setDate,
  isDateValid,
  setIsDateValid,
}) => {
  // sanitize the input coming from the job list table, so it can be filled into the calendar field in the edit job dialog, when its opened
  let scrubbedDateString = "";
  if (date !== undefined) {
    if (date.indexOf("/", 2) !== -1) {
      let temp = parse(date, "dd/MM/yy - HH:mm", new Date());
      scrubbedDateString = format(temp, "yyyy-MM-dd'T'HH:mm");
      console.log(scrubbedDateString);
    } else {
      scrubbedDateString = date;
    }
  }

  return (
    <>
      <div className="calendar">
        <TextField
          id="time"
          label="Dato/Tid"
          type="datetime-local"
          value={scrubbedDateString}
          variant="filled"
          fullWidth
          error={isDateValid ? false : true}
          helperText={isDateValid ? "" : "Ugyldig Dato"}
          onChange={(e) => {
            if (isValid(Date.parse(e.target.value)) === true) {
              setIsDateValid(true);
              setDate(e.target.value);
            } else {
              setIsDateValid(false);
            }
          }}
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
      </div>
    </>
  );
};
