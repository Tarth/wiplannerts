import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ConfirmationDialog } from "./confirmationDialog";
import { Description } from "../utilityComponents/descriptionInput";
import { DateInput } from "../utilityComponents/calendarInput";
import { CheckboxList } from "../utilityComponents/workerListBox";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { JobFormPropWithModal, Job_Worker } from "../../models/models";
import { UpdateJob, GetJobsState } from "../../utility/datahandler";
import { ResetInputFields } from "../../utility/resetinputfields";

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
  usrAlert,
  tasks,
  setTasks,
  setUsrAlert,
  isStartValid,
  setIsStartValid,
  isEndValid,
  setIsEndValid,
  openModal,
  setOpenModal,
}) => {
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
      setUsrAlert({
        type: "error",
        title: "Fejl",
        text: "En/flere ugyldig(e) indtastninger. Felterne må ikke være tomme.",
      });
    } else {
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
          setUsrAlert({
            type: "success",
            title: "Succes",
            text: "Job redigeret",
          });
          if (setTasks !== undefined) {
            GetJobsState(localStorage.getItem("accesstoken"), setTasks);
          }
          HandleClose();
        }
      } catch (error) {
        setUsrAlert({
          type: "error",
          title: "Fejl",
          text: `Job blev ikke tilføjet - ${error}. Kontakt Winoto support`,
        });
      }
    }
  };

  return (
    <div>
      <Dialog open={openModal} onClose={HandleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Rediger job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rediger indholdet af de forskellige felter og tryk gem, når du er færdig
          </DialogContentText>
          <Description description={description} setDescription={setDescription}></Description>
          <DateInput
            date={startDate}
            setDate={setStartDate}
            isDateValid={isStartValid}
            setIsDateValid={setIsStartValid}
          ></DateInput>
          <DateInput
            date={endDate}
            setDate={setEndDate}
            isDateValid={isEndValid}
            setIsDateValid={setIsEndValid}
          ></DateInput>
          <CheckboxList
            workers={workers}
            selectedWorkers={selectedWorkers}
            setSelectedWorkers={setSelectedWorkers}
          ></CheckboxList>
        </DialogContent>
        <DialogActions>
          <ConfirmationDialog
            setStartDate={setStartDate}
            startDate={startDate}
            setEndDate={setEndDate}
            setDescription={setDescription}
            setSelectedWorkers={setSelectedWorkers}
            selectedTasks={selectedTasks as Job_Worker}
            setUsrAlert={setUsrAlert}
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
    </div>
  );
};
