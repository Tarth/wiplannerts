import React, { useState, useEffect } from "react";
import "../css/admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { GetWorkers, GetJobs } from "../utility/datahandler";
import { ResetInputFields } from "../utility/resetinputfields";
import {
  Worker,
  Job_Worker,
  AlertProp,
  IsUserLoggedInProp,
} from "../models/models";
import { AddJobForm } from "../components/addJobToCalendarComponent/jobform";
import { JobListBox } from "../components/editJobInCalendarComponent/jobListTable";
import { Navigation } from "../components/navigation/navigation";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";

export const Admin: React.FC<IsUserLoggedInProp> = ({
  isLoggedIn,
  setIsLoggedIn,
  userGroup,
}) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([]);
  const [tasks, setTasks] = useState<Job_Worker[]>([]); //This state has all jobs fetched from DB
  const [selectedTasks, setSelectedTasks] = useState<Job_Worker>({
    worker: { id: 0, name: "" },
    description: "",
    start: new Date(),
    end: new Date(),
    id: -1,
  });
  const [startDate, setStartDate] = useState<string>(); // example value: "2020-12-23T23:59"
  const [endDate, setEndDate] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [views, setViews] = useState<string>(""); // This state controls which view is drawn on the admin page
  const [usrAlert, setUsrAlert] = useState<AlertProp>({
    type: undefined,
    title: "",
    text: "",
  });
  const [isStartValid, setIsStartValid] = useState(true);
  const [isEndValid, setIsEndValid] = useState(true);
  let view;

  const useStyles = makeStyles({
    buttonStyle: {
      backgroundColor: "#007ad9",
      "&:hover": {
        backgroundColor: "#006DCC",
      },
    },
  });

  const classes = useStyles();

  useEffect(() => {
    const token: string | null = localStorage.getItem("accesstoken");
    if (token !== null) {
      GetWorkers(setWorkers, token);
      GetJobs(setTasks, token);
    }
  }, []);

  if (views === "addjob") {
    view = (
      <div>
        <AddJobForm
          description={description}
          setDescription={setDescription}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          workers={workers}
          selectedWorkers={selectedWorkers}
          setSelectedWorkers={setSelectedWorkers}
          usrAlert={usrAlert}
          setUsrAlert={setUsrAlert}
          isStartValid={isStartValid}
          setIsStartValid={setIsStartValid}
          isEndValid={isEndValid}
          setIsEndValid={setIsEndValid}
        ></AddJobForm>
      </div>
    );
  } else {
    view = (
      <div className="editjob">
        <JobListBox
          description={description}
          setDescription={setDescription}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          workers={workers}
          selectedWorkers={selectedWorkers}
          setSelectedWorkers={setSelectedWorkers}
          tasks={tasks}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
          setTasks={setTasks}
          usrAlert={usrAlert}
          setUsrAlert={setUsrAlert}
          isStartValid={isStartValid}
          setIsStartValid={setIsStartValid}
          isEndValid={isEndValid}
          setIsEndValid={setIsEndValid}
        />
      </div>
    );
  }

  return (
    <>
      <Navigation
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userGroup={userGroup}
      ></Navigation>
      <div className="body">
        <div className="buttongroup">
          <Button
            className={classes.buttonStyle}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setViews("addjob");
              const defaultInfoText =
                "Udfyld felterne nedenfor og brug derefter knappen i bunden til at tilføje et job til kalenderen.";
              if (usrAlert.text !== defaultInfoText) {
                setUsrAlert({
                  type: "info",
                  title: "Information",
                  text: defaultInfoText,
                });
              }
              if (
                description !== "" ||
                (startDate !== "" && startDate !== undefined) ||
                (endDate !== "" && endDate !== undefined) ||
                selectedWorkers !== []
              ) {
                ResetInputFields(
                  setDescription,
                  setStartDate,
                  setEndDate,
                  setSelectedWorkers
                );
              }
            }}
          >
            Tilføj Job
          </Button>
          <Button
            className={classes.buttonStyle}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              GetJobs(setTasks, localStorage.getItem("accesstoken"));
              setViews("");
              const defaultInfoText =
                "Marker et af jobbene i tabellen nedenfor, og brug derefter knapperne i bunden til at slette/redigere det valgte. NB: På nuværende tidspunkt kan der desværre kun ændres et job ad gangen.";
              if (usrAlert.text !== defaultInfoText) {
                setUsrAlert({
                  type: "info",
                  title: "Information",
                  text: defaultInfoText,
                });
              }
            }}
          >
            Rediger Job
          </Button>
        </div>
        {view}
      </div>
    </>
  );
};
