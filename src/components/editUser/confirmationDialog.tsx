import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { DeleteUser, GetUsersReturn, GetJobsReturn } from "../../utility/datahandler";
import { DeleteUserConfirmationProp } from "../../models/models";

export const DeleteUserDialog: React.FC<DeleteUserConfirmationProp> = ({
  userId,
  setUsers,
  HandleClose,
}) => {
  const [confirm, setConfirm] = useState(false);
  const accessToken = localStorage.getItem("accesstoken");

  const ClickOpenConfirm = async () => {
    if (accessToken !== null) {
      const userJobsInDb = await GetJobsReturn(accessToken, { id: userId });
      if (Array.isArray(userJobsInDb)) {
        if (userJobsInDb.length !== 0) {
          console.log(
            "Denne bruger har jobs i databasen. Hvis brugeren slettes, så fjernes disse også"
          );
        } else {
          console.log("Ingen jobs!!!!");
        }
      }
      setConfirm(true);
    }
  };

  const ClickCloseConfirm = () => {
    setConfirm(false);
  };

  const HandleCloseDelete = async () => {
    if (accessToken != null) {
      try {
        ClickCloseConfirm();
        HandleClose();
        await DeleteUser(userId, accessToken);
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
            Slet denne bruger fra systemet?
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
