import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from "./style";
import { JobFormProp } from "../../models/models";
import { PostJob } from "../../utility/datahandler";
import { ResetInputFields } from "../../utility/resetinputfields";
import { DateInput } from "../utilityComponents/calendarInput";
import { Description } from "../utilityComponents/descriptionInput";
import { CheckboxList } from "../utilityComponents/workerListBox";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";

export const AddJobForm: React.FC<JobFormProp> = ({
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

  return (
    <>
      {alert}
      <div className="parentDiv">
        <div className={classes.leftContainer}>
          <Description description={description} setDescription={setDescription} />
          <DateInput
            date={startDate}
            setDate={setStartDate}
            isDateValid={isStartValid}
            setIsDateValid={setIsStartValid}
          />
          <DateInput
            date={endDate}
            setDate={setEndDate}
            isDateValid={isEndValid}
            setIsDateValid={setIsEndValid}
          />
        </div>

        <div className="rightContainer">
          <CheckboxList
            workers={workers}
            selectedWorkers={selectedWorkers}
            setSelectedWorkers={setSelectedWorkers}
          ></CheckboxList>
        </div>
        <div className="buttonContainer">
          <ButtonWrapper
            onClick={AddJob}
            caption="Tilføj"
            variant="text"
            color="primary"
          ></ButtonWrapper>

          {/* <Button variant="outlined" color="primary" onClick={AddJob}>
            Tilføj
          </Button> */}
        </div>
      </div>
    </>
  );
};
