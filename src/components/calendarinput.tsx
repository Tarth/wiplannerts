import React, { useState } from "react";
import { isValid } from "date-fns";
import TextField from "@material-ui/core/TextField";

interface CalendarProps {
  date: string | undefined;
  setDate: (date: string | undefined) => void;
}

export const DateInput: React.FC<CalendarProps> = ({ date, setDate }) => {
  const [isDateValid, setIsDateValid] = useState<boolean>(true);
  return (
    <>
      <div>
        <TextField
          id="time"
          label="Dato/Tid"
          type="datetime-local"
          defaultValue=""
          variant="filled"
          error={isDateValid ? false : true}
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
