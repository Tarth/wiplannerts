import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { RememberMeProp } from "../../../models/models";

export const RememberMeCheckbox: React.FC<RememberMeProp> = ({ rememberMe, setRememberMe }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked
          checked={rememberMe}
          onChange={() => {
            if (rememberMe !== undefined && setRememberMe !== undefined) {
              if (rememberMe) {
                setRememberMe(false);
              } else {
                setRememberMe(true);
              }
            }
          }}
          name="rememberMe"
          color="primary"
        ></Checkbox>
      }
      label="Husk mig"
    ></FormControlLabel>
  );
};
