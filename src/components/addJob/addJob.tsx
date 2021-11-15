import React, { useState, useEffect } from "react";
import { useStyles } from "./style";
import { JobFormPropWithModal } from "../../models/models";
import { PostJob } from "../../utility/datahandler";
import { ResetInputFields } from "../../utility/resetinputfields";
import { DateInput } from "../utilityComponents/calendarInput";
import { Description } from "../utilityComponents/descriptionInput";
import { CheckboxList } from "../utilityComponents/workerListBox";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl } from "@material-ui/core";

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
  usrAlert,
  setUsrAlert,
  isStartValid,
  setIsStartValid,
  isEndValid,
  setIsEndValid,
  openModal,
  setOpenModal,
}) => {
  const classes = useStyles();
  let alert;

  useEffect(() => {
    const defaultInfoText =
      "Udfyld felterne nedenfor og brug derefter knappen i bunden til at tilføje et job til kalenderen.";
    if (usrAlert.text === "") {
      setUsrAlert({
        type: "info",
        title: "Information",
        text: defaultInfoText,
      });
    }
  }, [setUsrAlert, usrAlert]);

  alert = (
    <div className="alertDiv">
      <UserAlertHandler
        type={usrAlert.type}
        title={usrAlert.title}
        text={usrAlert.text}
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
      setUsrAlert({
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
        setUsrAlert({
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
          <form className={classes.form}>
            <div className={classes.leftContainer}>
              <Description description={description} setDescription={setDescription} />
              <FormControl>
                <DateInput
                  date={startDate}
                  setDate={setStartDate}
                  isDateValid={isStartValid}
                  setIsDateValid={setIsStartValid}
                />
              </FormControl>
              <FormControl>
                <DateInput
                  date={endDate}
                  setDate={setEndDate}
                  isDateValid={isEndValid}
                  setIsDateValid={setIsEndValid}
                />
              </FormControl>
            </div>
            <CheckboxList
              workers={workers}
              selectedWorkers={selectedWorkers}
              setSelectedWorkers={setSelectedWorkers}
            ></CheckboxList>
          </form>
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
