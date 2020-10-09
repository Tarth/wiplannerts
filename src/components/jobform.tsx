import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Worker } from "../models";
import { PostJob } from "../datahandler";
import { DateInput } from "./calendarinput";
import { Description } from "./descriptioninput";
import { CheckboxList } from "./workerlistbox";

interface JobFormProp {
  description: string;
  setDescription: (description: string) => void;
  startDate: string | undefined;
  setStartDate: (date: string | undefined) => void;
  endDate: string | undefined;
  setEndDate: (date: string | undefined) => void;
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
}

const useStyles = makeStyles({
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
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
}) => {
  const [isStartValid, setIsStartValid] = useState(true);
  const [isEndValid, setIsEndValid] = useState(true);
  const [activeAlert, setActiveAlert] = useState("");
  let alert;

  const classes = useStyles();

  if (activeAlert === "error") {
    alert = (
      <Alert severity="error">
        Noget gik galt! Alle felter skal være udfyldt korrekt
      </Alert>
    );
  } else if (activeAlert === "success") {
    alert = <Alert severity="success">Job tilføjet til kalenderen</Alert>;
  } else {
    alert = <div></div>;
  }

  return (
    <>
      <Box display="flex">
        {alert}
        <Box className={classes.leftContainer}>
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
        </Box>
        <div className="rightContainer">
          <CheckboxList
            workers={workers}
            selectedWorkers={selectedWorkers}
            setSelectedWorkers={setSelectedWorkers}
          ></CheckboxList>
        </div>
      </Box>
      <Button
        // className="addJobButton"
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
            setActiveAlert("error");
          } else {
            setActiveAlert("success");
            // PostJob(
            //   startDate as string,
            //   endDate as string,
            //   description,
            //   selectedWorkers.map((x) => x.id)
            // );
          }
        }}
      >
        Tilføj til kalender
      </Button>
    </>
  );
};
