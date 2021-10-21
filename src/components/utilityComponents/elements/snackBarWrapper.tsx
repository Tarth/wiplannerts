import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SnackbarProp } from "../../../models/models";

export const SnackbarWrapper: React.FC<SnackbarProp> = ({
  severity,
  message,
  openSnackbar,
  setOpenSnackbar,
}) => {
  const Close = () => {
    setOpenSnackbar(false);
  };

  return (
    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={Close}>
      <Alert onClose={Close} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
