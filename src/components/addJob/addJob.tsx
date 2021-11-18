import React, { useEffect } from "react";
import { JobFormPropWithModal } from "../../models/models";
import { PostJob } from "../../utility/datahandler";
import { ResetInputFields } from "../../utility/resetinputfields";
// import { UserAlertHandler } from "../utilityComponents/userAlert";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { FormJob } from "../utilityComponents/elements/formJob";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

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
}) => {
  // useEffect(() => {
  //   const defaultInfoText =
  //     "Udfyld felterne nedenfor og brug derefter knappen i bunden til at tilføje et job til kalenderen.";
  //   if (userAlert.text === "") {
  //     setUserAlert({
  //       type: "info",
  //       title: "Information",
  //       text: defaultInfoText,
  //     });
  //   }
  // }, [setUserAlert, userAlert]);

  // let alert;
  // alert = (
  //   <div className="alertDiv">
  //     <UserAlertHandler
  //       type={userAlert.type}
  //       title={userAlert.title}
  //       text={userAlert.text}
  //     ></UserAlertHandler>
  //   </div>
  // );

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
      setUserAlert({
        type: "error",
        title: "Fejl",
        text: "En/flere ugyldig(e) indtastninger. Felterne må ikke være tomme.",
      });
    } else {
      try {
        await PostJob(
          startDate as string,
          endDate as string,
          description,
          selectedWorkers.map((x) => x.id),
          localStorage.getItem("accesstoken")
        );
        setUserAlert({
          type: "success",
          title: "Succes",
          text: "Job tilføjet til kalenderen.",
        });
        ResetInputFields(setDescription, setStartDate, setEndDate, setSelectedWorkers);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const CloseAddModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Dialog open={openModal} onClose={CloseAddModal}>
        <DialogTitle>Tilføj Job</DialogTitle>
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
