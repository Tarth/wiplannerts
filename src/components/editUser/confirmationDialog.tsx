import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { DeleteUser, GetJobsReturn, DeleteJob } from "../../utility/datahandler";
import { DeleteUserConfirmationProp, AlertProp } from "../../models/models";
import { UserAlertHandler } from "../utilityComponents/userAlert";

export const DeleteUserDialog: React.FC<DeleteUserConfirmationProp> = ({ userId, HandleClose }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [userAlert, setUserAlert] = useState<AlertProp>({
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
          setUserAlert({
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
          const newMap: number[] = [];
          userJobsInDb.forEach((job) => {
            newMap.push(job.job_id);
          });
          await DeleteJob(newMap, accessToken);
        }
        await DeleteUser(userId, accessToken);
        ClickCloseConfirm();
        HandleClose();
      } catch (error) {
        setUserAlert({
          type: "error",
          title: "Fejl",
          text: `${error}`,
        });
      }
    }
  };

  let alert = (
    <div>
      <UserAlertHandler
        type={userAlert.type}
        title={userAlert.title}
        text={userAlert.text}
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
