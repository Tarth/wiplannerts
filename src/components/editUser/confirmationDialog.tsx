import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { DeleteUser, GetWorkers } from "../../utility/datahandler";
import { DeleteUserConfirmationProp } from "../../models/models";

export const AlertDialog: React.FC<DeleteUserConfirmationProp> = ({ userId, setUsers }) => {
  const [open, setOpen] = useState(false);

  const HandleClickOpen = () => {
    setOpen(true);
  };

  const HandleClose = () => {
    setOpen(false);
  };

  const accessToken = localStorage.getItem("accesstoken");

  const HandleCloseDelete = async () => {
    if (accessToken != null) {
      try {
        await DeleteUser(userId, accessToken);
        await GetWorkers(setUsers, accessToken, { querySelector: "" });
        HandleClose();
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <div>
      <Button onClick={HandleClickOpen}>Slet</Button>
      <Dialog
        open={open}
        onClose={HandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Slet bruger?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Slet denne bruger fra systemet? Bemærk, at hvis brugeren har jobs i kalenderen, bliver
            disse også slettet!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleClose} color="primary">
            Fortryd
          </Button>
          <Button onClick={HandleCloseDelete} color="primary" autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
