import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { Worker } from "../models/models";
import { PostJob } from "../datahandler";
import { DateInput } from "./calendarinput";
import { Description } from "./descriptioninput";
import { CheckboxList } from "./workerlistbox";
import { AlertTitle } from "@material-ui/lab";

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

interface AlertProp {
  type: "success" | "info" | "warning" | "error" | undefined;
  title: string;
  text: string;
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

const UserAlertHandler: React.FC<AlertProp> = ({type, title, text}) => {
  if (type !== undefined){
    return (  
      <Alert severity={type}>
      <AlertTitle>{title}</AlertTitle>
      {text}
      </Alert>)
  } else {
    return <div></div>
  }
}

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
  const [usrAlert, setUsrAlert] = useState<AlertProp>({type: undefined, title: "", text: ""});

  let alert;

  const classes = useStyles();

  if (usrAlert.type !== undefined) {
    alert = (
      <UserAlertHandler type={usrAlert.type} title={usrAlert.title} text={usrAlert.text}></UserAlertHandler>
    );
  } else {
    alert = (
      <div></div>
    );
    }

  return (
    <>
      <div className="alertDiv">{alert}</div>
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
                setUsrAlert({type: "error", title: "Fejl", text: "En/flere ugyldig(e) indtastninger. Felterne må ikke være tomme"});
              } else {
                const returnmsg = PostJob(
                  startDate as string,
                  endDate as string,
                  description,
                  selectedWorkers.map((x) => x.id)
                  );
                  returnmsg.then(() => {
                    setUsrAlert({type: "success", title: "Succes", text: "Job tilføjet til kalenderen"})
                  }, () => {
                    setUsrAlert({type: "error", title: "Fejl", text: "Job tilføjet til kalenderen"})
                })
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
