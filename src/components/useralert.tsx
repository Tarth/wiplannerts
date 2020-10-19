import React from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

export interface AlertProp {
  type: "success" | "info" | "warning" | "error" | undefined;
  title: string;
  text: string;
}

export const UserAlertHandler: React.FC<AlertProp> = ({
  type,
  title,
  text,
}) => {
  if (type !== undefined) {
    return (
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {text}
      </Alert>
    );
  } else {
    return <div></div>;
  }
};
