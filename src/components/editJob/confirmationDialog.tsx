import React from "react";
import { ConfirmationDialogProp } from "../../models/models";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { ResetJobInputFields } from "../utilityComponents/resetinputfields";
import { DeleteJob, GetJobsState } from "../../utility/datahandler";
import { CheckToken } from "../../utility/auth";
import { useStyleConfirmationDialog } from "./style";
export const ConfirmationDialog: React.FC<ConfirmationDialogProp> = ({
  setStartDate,
  setDescription,
  setEndDate,
  setSelectedWorkers,
  selectedTasks,
  setUserAlert,
  setTasks,
  startDate,
  setOpenModal,
}) => {
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const classes = useStyleConfirmationDialog();

  const handleClickOpen = () => {
    setOpenConfirmModal(true);
  };

  const CloseEditModal = () => {
    setOpenModal(false);
  };

  const CloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  function InvalidInput() {
    if (startDate === "" || startDate === undefined) {
      setUserAlert({
        type: "error",
        title: "Fejl",
        text: "Du skal vælge en post i listen, inden du trykker på slette knappen.",
      });
    } else {
      handleClickOpen();
    }
  }

  async function ConfirmJobDelete() {
    if (selectedTasks.id === -1) {
      setUserAlert({
        type: "error",
        title: "Fejl",
        text: "Du skal vælge en post i listen, inden du trykker på slette knappen.",
      });
      return;
    }
    try {
      const accessToken = await CheckToken();
      if (typeof accessToken !== "string") return accessToken;
      await DeleteJob(selectedTasks.id, accessToken);
      setUserAlert({
        type: "success",
        title: "Succes",
        text: "Job blev slettet fra kalenderen.",
      });
      GetJobsState(accessToken, setTasks);
      ResetJobInputFields(setStartDate, setDescription, setEndDate, setSelectedWorkers);
      CloseConfirmModal();
      CloseEditModal();
    } catch (error) {
      setUserAlert({
        type: "error",
        title: "Fejl",
        text: `${error}. Kontakt Winoto support`,
      });
    }
  }
  return (
    <div className={classes.buttonWrapper}>
      <ButtonWrapper
        className={classes.button}
        onClick={InvalidInput}
        caption="Slet"
        variant="text"
        color="secondary"
      ></ButtonWrapper>
      <Dialog
        open={openConfirmModal}
        onClose={CloseEditModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Slet opgave?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Er du sikker på at du vil slette den valgte opgave fra listen? Bemærk at dit valg ikke
            kan fortrydes!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonWrapper
            onClick={CloseConfirmModal}
            caption="Nej"
            color="primary"
            variant="text"
          ></ButtonWrapper>
          <ButtonWrapper
            onClick={ConfirmJobDelete}
            caption="Ja"
            variant="text"
            color="primary"
          ></ButtonWrapper>
        </DialogActions>
      </Dialog>
    </div>
  );
};
