import React from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { AlertProp } from "../../models/models";

export const UserAlertHandler: React.FC<AlertProp> = ({ type, title, text }) => {
  if (type !== "") {
    return (
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};
