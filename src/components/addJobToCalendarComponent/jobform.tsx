import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { JobFormProp } from "../../models/models";
import { PostJob } from "../../utility/datahandler";
import { ResetInputFields } from "../../utility/resetinputfields";
import { DateInput } from "../utilityComponents/calendarInputComponent";
import { Description } from "../utilityComponents/descriptionInputComponent";
import { CheckboxList } from "../utilityComponents/workerListBoxComponent";
import { UserAlertHandler } from "../utilityComponents/userAlertComponent";

const useStyles = makeStyles({
  button: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    marginTop: "50px",
  },
  leftContainer: {
    marginRight: "40px",
  },
});

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

  return (
    <>
      {alert}
      <div className="parentDiv">
        <div className="leftContainer">
          <Description
            description={description}
            setDescription={setDescription}
          />
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
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => {
              if (
                description === "" ||
                isStartValid === false ||
                isEndValid === false ||
                workers === []
              ) {
                setUsrAlert({
                  type: "error",
                  title: "Fejl",
                  text:
                    "En/flere ugyldig(e) indtastninger. Felterne må ikke være tomme.",
                });
              } else {
                const returnmsg = PostJob(
                  startDate as string,
                  endDate as string,
                  description,
                  selectedWorkers.map((x) => x.id)
                );
                returnmsg
                  .then(
                    () => {
                      setUsrAlert({
                        type: "success",
                        title: "Succes",
                        text: "Job tilføjet til kalenderen.",
                      });
                      ResetInputFields(
                        setDescription,
                        setStartDate,
                        setEndDate,
                        setSelectedWorkers
                      );
                    },
                    () => {
                      setUsrAlert({
                        type: "error",
                        title: "Fejl",
                        text:
                          "Job blev ikke tilføjet til kalenderen pga en fejl. Kontakt Winoto support",
                      });
                    }
                  )
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }}
          >
            Tilføj til kalender
          </Button>
        </div>
      </div>
    </>
  );
};