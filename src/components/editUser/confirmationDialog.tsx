import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { DeleteUser, GetUsers } from "../../utility/datahandler";
import { DeleteUserConfirmationProp } from "../../models/models";

export const DeleteUserDialog: React.FC<DeleteUserConfirmationProp> = ({
  userId,
  setUsers,
  HandleClose,
}) => {
  const [confirm, setConfirm] = useState(false);
  const accessToken = localStorage.getItem("accesstoken");

  const ClickOpenConfirm = () => {
    GetUsers(accessToken as string, true);
    setConfirm(true);
  };

  const ClickCloseConfirm = () => {
    setConfirm(false);
  };

  const HandleCloseDelete = async () => {
    if (accessToken != null) {
      try {
        await DeleteUser(userId, accessToken);
        await GetUsers(accessToken, setUsers);
        ClickCloseConfirm();
        HandleClose();
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <div>
      <Button onClick={ClickOpenConfirm}>Slet</Button>
      <Dialog
        open={confirm}
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
          <Button onClick={ClickCloseConfirm} color="primary">
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
