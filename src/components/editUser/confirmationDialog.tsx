import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { DeleteUser, GetJobsReturn, DeleteJob, GetUsersState } from "../../utility/datahandler";
import { DeleteUserConfirmationProp, AlertProp } from "../../models/models";
import { UserAlertHandler } from "../utilityComponents/userAlert";

export const DeleteUserDialog: React.FC<DeleteUserConfirmationProp> = ({
  userId,
  setUsers,
  HandleClose,
  setUserAlert,
}) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [localAlert, setLocalAlert] = useState<AlertProp>({
    type: undefined,
    title: "",
    text: "",
  });
  const accessToken = localStorage.getItem("accesstoken");
  let userJobsInDb: unknown;

  const ClickOpenConfirm = async () => {
    if (accessToken !== null) {
      userJobsInDb = await GetJobsReturn(accessToken, { id: userId });
      if (Array.isArray(userJobsInDb)) {
        if (userJobsInDb.length !== 0) {
          setLocalAlert({
            type: "warning",
            title: "Advarsel",
            text: "Denne bruger har jobs i databasen. Hvis brugeren slettes, så fjernes disse også",
          });
        }
      }
      setConfirmDialogOpen(true);
    }
  };

  const ClickCloseConfirm = () => {
    setConfirmDialogOpen(false);
  };

  const HandleCloseDelete = async () => {
    if (accessToken != null) {
      try {
        userJobsInDb = await GetJobsReturn(accessToken, { id: userId });
        if (Array.isArray(userJobsInDb)) {
          await DeleteJob(userJobsInDb, accessToken);
        }
        await DeleteUser(userId, accessToken);
        await GetUsersState(accessToken, setUsers);
        setUserAlert({
          type: "success",
          title: "Succes",
          text: "Bruger og evt. tilhørende jobs blev slettet fra databasen",
        });
        ClickCloseConfirm();
        HandleClose();
      } catch (error) {
        setLocalAlert({
          type: "error",
          title: "Fejl",
          text: `${error} - Kontakt Winoto`,
        });
      }
    }
  };

  let alert = (
    <div>
      <UserAlertHandler
        type={localAlert.type}
        title={localAlert.title}
        text={localAlert.text}
      ></UserAlertHandler>
    </div>
  );
  return (
    <div>
      <Button onClick={ClickOpenConfirm}>Slet</Button>
      <Dialog
        open={confirmDialogOpen}
        onClose={HandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Slet bruger?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Slet denne bruger fra systemet?
            {alert}
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
