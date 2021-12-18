import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { JobFormPropWithModal } from "../../models/models";
import { GetJobsState, PostJob } from "../../utility/datahandler";
import { CheckToken } from "../../utility/auth";
import { ResetJobInputFields } from "../utilityComponents/resetinputfields";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { FormJob } from "../utilityComponents/formJob";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { alertStyle } from "../utilityComponents/userAlert.style";

export const AddJobForm: React.FC<JobFormPropWithModal> = ({
  description,
  setDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  workers,
  selectedWorkers,
  setSelectedWorkers,
  userAlert,
  setUserAlert,
  isStartValid,
  setIsStartValid,
  isEndValid,
  setIsEndValid,
  openModal,
  setOpenModal,
  modalAlert,
  setModalAlert,
  setTasks,
}) => {
  const { alertDiv } = alertStyle();

  let alert = (
    <div className={alertDiv}>
      <UserAlertHandler
        type={modalAlert.type}
        title={modalAlert.title}
        text={modalAlert.text}
      ></UserAlertHandler>
    </div>
  );

  function InvalidInput() {
    if (
      description === "" ||
      startDate === "" ||
      endDate === "" ||
      isStartValid === false ||
      isEndValid === false ||
      selectedWorkers.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  const AddJob = async () => {
    if (InvalidInput()) {
      setModalAlert({
        type: "error",
        title: "Fejl",
        text: "En/flere ugyldig(e) indtastninger. Felterne må ikke være tomme.",
      });
    } else {
      try {
        const accessToken = await CheckToken();
        if (typeof accessToken !== "string") return accessToken;
        await PostJob(
          startDate as string,
          endDate as string,
          description,
          selectedWorkers.map((x) => x.id),
          accessToken
        );
        setModalAlert({
          type: "success",
          title: "Succes",
          text: "Job tilføjet til kalenderen.",
        });
        ResetJobInputFields(setDescription, setStartDate, setEndDate, setSelectedWorkers);
        GetJobsState(accessToken, setTasks);
      } catch (error) {
        setModalAlert({
          type: "error",
          title: "Fejl",
          text: `${error} - Kontakt winoto support`,
        });
      } finally {
        if (modalAlert.type !== "") {
          ResetAlert();
        }
      }
    }
  };
  const CloseAddModal = () => {
    setOpenModal(false);
    ResetAlert();
  };

  const ResetAlert = () => {
    setModalAlert({
      type: "",
      title: "",
      text: "",
    });
  };

  return (
    <>
      <Dialog open={openModal} onClose={CloseAddModal}>
        <DialogTitle>Tilføj Job</DialogTitle>
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
          <div className="buttonContainer">
            <ButtonWrapper
              onClick={CloseAddModal}
              caption="Annuller"
              variant="text"
            ></ButtonWrapper>
            <ButtonWrapper
              onClick={AddJob}
              caption="Tilføj"
              variant="text"
              color="primary"
            ></ButtonWrapper>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};
