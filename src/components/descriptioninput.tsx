import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

interface InputProps {
  description: string;
  setDescription: (description: string) => void;
}

export const Description: React.FC<InputProps> = ({
  description,
  setDescription,
}) => {
  const [isInputValid, setIsInputValid] = useState(true);
  const invalidInput = /[!"#$%/{()=}?+<>*[\]']/g;

  return (
    <div className="description">
      <TextField
        variant="filled"
        error={isInputValid ? false : true}
        helperText={isInputValid ? "" : "Ugyldige tegn"}
        defaultValue=""
        autoFocus={true}
        onChange={(e) => {
          //Check if input matches any special chars
          if (invalidInput.test(e.target.value) === false) {
            setIsInputValid(true);
            setDescription(e.target.value);
          } else {
            setIsInputValid(false);
          }
        }}
      ></TextField>
    </div>
  );
};
