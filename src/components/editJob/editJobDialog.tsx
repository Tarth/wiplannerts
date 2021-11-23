import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { ConfirmationDialog } from "./confirmationDialog";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { FormJob } from "../utilityComponents/formJob";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { JobFormPropWithModal, Job_Worker } from "../../models/models";
import { UpdateJob, GetJobsState } from "../../utility/datahandler";
import { ResetJobInputFields } from "../utilityComponents/resetinputfields";
// import { SnackbarWrapper } from "../utilityComponents/elements/snackBarWrapper";
import { alertStyle } from "../utilityComponents/userAlert.style";

export const EditJobDialog: React.FC<JobFormPropWithModal> = ({
  description,
  setDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  workers,
  selectedWorkers,
  setSelectedWorkers,
  selectedTasks,
  userAlert,
  tasks,
  setTasks,
  setUserAlert,
  isStartValid,
  setIsStartValid,
  isEndValid,
  setIsEndValid,
  openModal,
  setOpenModal,
  modalAlert,
  setModalAlert,
}) => {
  const [, setOpenSnackbar] = useState(false);
  const classes = alertStyle();
  const { alertDiv } = classes;

  const ResetAlert = () => {
    setModalAlert({
      type: "",
      title: "",
      text: "",
    });
  };

  let alert = (
    <div className={alertDiv}>
      <UserAlertHandler
        type={modalAlert.type}
        title={modalAlert.title}
        text={modalAlert.text}
      ></UserAlertHandler>
    </div>
  );

  const HandleClose = () => {
    setOpenModal(false);
    ResetJobInputFields(setDescription, setStartDate, setEndDate, setSelectedWorkers);
    ResetAlert();
  };

  function InvalidInput() {
    if (
      description === "" ||
      isStartValid === false ||
      isEndValid === false ||
      selectedWorkers.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  const HandleClickSave = async () => {
    if (InvalidInput()) {
      setModalAlert({
        type: "error",
        title: "Fejl",
        text: "En/flere ugyldig(e) indtastninger. Felterne må ikke være tomme.",
      });
      return;
    }
    try {
      if (selectedTasks !== undefined) {
        await UpdateJob(
          startDate as string,
          endDate as string,
          description,
          selectedWorkers.map((x) => x.id),
          selectedTasks.id,
          localStorage.getItem("accesstoken")
        );
        setUserAlert({
          type: "success",
          title: "Succes",
          text: "Job redigeret",
        });
        setOpenSnackbar(true);
        if (setTasks !== undefined) {
          GetJobsState(localStorage.getItem("accesstoken"), setTasks);
        }
        HandleClose();
        ResetAlert();
      }
    } catch (error) {
      setModalAlert({
        type: "error",
        title: "Fejl",
        text: `${error}. Kontakt Winoto support`,
      });
    }
  };

  return (
    <div>
      <Dialog open={openModal} onClose={HandleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Rediger job</DialogTitle>
        <DialogContent>
          {alert}
          <FormJob
            description={description}
            endDate={endDate}
            isEndValid={isEndValid}
            isStartValid={isStartValid}
            selectedWorkers={selectedWorkers}
            setDescription={setDescription}
            setEndDate={setEndDate}
            setIsEndValid={setIsEndValid}
            setIsStartValid={setIsStartValid}
            setSelectedWorkers={setSelectedWorkers}
            setStartDate={setStartDate}
            setUserAlert={setUserAlert}
            startDate={startDate}
            workers={workers}
          ></FormJob>
        </DialogContent>
        <DialogActions>
          <ConfirmationDialog
            setStartDate={setStartDate}
            startDate={startDate}
            setEndDate={setEndDate}
            setDescription={setDescription}
            setSelectedWorkers={setSelectedWorkers}
            selectedTasks={selectedTasks as Job_Worker}
            setUserAlert={setUserAlert}
            setTasks={setTasks}
            setOpenModal={setOpenModal}
          ></ConfirmationDialog>
          <ButtonWrapper
            onClick={HandleClose}
            caption="Annuller"
            color="default"
            variant="text"
          ></ButtonWrapper>
          <ButtonWrapper
            onClick={HandleClickSave}
            caption="Gem"
            color="primary"
            variant="text"
          ></ButtonWrapper>
        </DialogActions>
      </Dialog>
    </div>
  );
};
