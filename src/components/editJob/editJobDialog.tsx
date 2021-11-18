import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { ConfirmationDialog } from "./confirmationDialog";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { FormJob } from "../utilityComponents/elements/formJob";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { AlertProp, JobFormPropWithModal, Job_Worker } from "../../models/models";
import { UpdateJob, GetJobsState } from "../../utility/datahandler";
import { ResetInputFields } from "../../utility/resetinputfields";
import { SnackbarWrapper } from "../utilityComponents/elements/snackBarWrapper";

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
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    severity: "",
    message: "",
  });

  let snackbar = (
    <SnackbarWrapper
      openSnackbar={openSnackbar}
      setOpenSnackbar={setOpenSnackbar}
      severity={snackbarMessage.severity as "success" | "info" | "warning" | "error" | undefined}
      message={snackbarMessage.message}
    ></SnackbarWrapper>
  );

  const HandleClose = () => {
    setOpenModal(false);
    ResetInputFields(setDescription, setStartDate, setEndDate, setSelectedWorkers);
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
      setUserAlert({
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
        setSnackbarMessage({ severity: "success", message: "Job redigeret" });
        setOpenSnackbar(true);

        if (setTasks !== undefined) {
          GetJobsState(localStorage.getItem("accesstoken"), setTasks);
        }
        HandleClose();
      }
    } catch (error) {
      setUserAlert({
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
      {snackbar}
    </div>
  );
};
