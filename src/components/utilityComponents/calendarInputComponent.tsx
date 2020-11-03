import React from "react";
import { CalendarProps } from "../../models/models";
import { isValid } from "date-fns";
import TextField from "@material-ui/core/TextField";

export const DateInput: React.FC<CalendarProps> = ({
  date,
  setDate,
  isDateValid,
  setIsDateValid,
}) => {
  return (
    <>
      <div className="calendar">
        <TextField
          id="time"
          label="Dato/Tid"
          type="datetime-local"
          value={date}
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
