import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { DeleteUser, GetJobsReturn, DeleteJob, GetUsersState } from "../../utility/datahandler";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { DeleteUserConfirmationProp, AlertProp } from "../../models/models";
import { useStylesConfirmationDialog } from "./style";

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
  const [loading, setLoading] = useState(false);
  const [deleteConfirmationLoading, setDeleteConfirmationLoading] = useState(false);
  const accessToken = localStorage.getItem("accesstoken");
  let userJobsInDb: unknown;

  const classes = useStylesConfirmationDialog();
  const ClickOpenConfirm = async () => {
    try {
      setLoading(true);
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
        setLoading(false);
        setConfirmDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ClickCloseConfirm = () => {
    setConfirmDialogOpen(false);
  };

  const HandleCloseDelete = async () => {
    if (accessToken != null) {
      try {
        setDeleteConfirmationLoading(true);
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
        setDeleteConfirmationLoading(false);
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
    <div className={classes.deleteButton}>
      <ButtonWrapper
        onClick={ClickOpenConfirm}
        caption="Slet"
        variant="text"
        color="secondary"
      ></ButtonWrapper>
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
          <ButtonWrapper
            onClick={ClickCloseConfirm}
            caption="Fortryd"
            variant="text"
            color="default"
          ></ButtonWrapper>
          <ButtonWrapper
            onClick={HandleCloseDelete}
            caption="Ja"
            variant="text"
            color="primary"
          ></ButtonWrapper>
        </DialogActions>
      </Dialog>
    </div>
  );
};
