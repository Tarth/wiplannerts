import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { DeleteUser, GetJobsReturn, DeleteJob, GetUsersAsState } from "../../utility/datahandler";
import { CheckToken } from "../../utility/auth";
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
    type: "",
    title: "",
    text: "",
  });
  const [, setLoading] = useState(false);
  const [, setDeleteConfirmationLoading] = useState(false);
  let userJobsInDb: unknown;

  const classes = useStylesConfirmationDialog();
  const ClickOpenConfirm = async () => {
    try {
      const accessToken = await CheckToken();
      if (typeof accessToken !== "string") return accessToken;
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

  const ClickCloseDelete = async () => {
    try {
      const accessToken = await CheckToken();
      if (typeof accessToken !== "string" || accessToken === null) return accessToken;
      setDeleteConfirmationLoading(true);
      userJobsInDb = await GetJobsReturn(accessToken, { id: userId });
      if (Array.isArray(userJobsInDb) && userJobsInDb.length !== 0) {
        await DeleteJob(userJobsInDb, accessToken);
      }
      await DeleteUser(userId, accessToken);
      await GetUsersAsState(accessToken, setUsers);
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
  };

  let alert = (
    <>
      <UserAlertHandler
        type={localAlert.type}
        title={localAlert.title}
        text={localAlert.text}
      ></UserAlertHandler>
    </>
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
            onClick={ClickCloseDelete}
            caption="Ja"
            variant="text"
            color="primary"
          ></ButtonWrapper>
        </DialogActions>
      </Dialog>
    </div>
  );
};
