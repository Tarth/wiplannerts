import React, { useState, useEffect } from "react";
import "../css/admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { GetUsersState, GetJobsState } from "../utility/datahandler";
import { ResetInputFields } from "../utility/resetinputfields";
import { Worker, Job_Worker, AlertProp, IsUserLoggedInProp } from "../models/models";
import { JobListBox } from "../components/editJob/editJob";
import { Navigation } from "../components/navigation/navigation";
import { EditUser } from "../components/editUser/editUser";
import Button from "@material-ui/core/Button";
import { PeopleAlt, CalendarToday } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";
import { getUserGroupNumber } from "../utility/usergroups";

export const Admin: React.FC<IsUserLoggedInProp> = ({ isLoggedIn, setIsLoggedIn, userGroup }) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([]);
  const [tasks, setTasks] = useState<Job_Worker[]>([]); //This state has all jobs fetched from DB
  const [selectedTasks, setSelectedTasks] = useState<Job_Worker>({
    worker: { id: 0, name: "", username: "", usergroup_id: 0, password: "" },
    description: "",
    start: new Date(),
    end: new Date(),
    id: -1,
  });
  const [startDate, setStartDate] = useState<string>(); // example value: "2020-12-23T23:59"
  const [endDate, setEndDate] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [views, setViews] = useState<string>("editjob"); // This state controls which view is drawn on the admin page
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
  const accessToken: string | null = localStorage.getItem("accesstoken");

  useEffect(() => {
    if (accessToken !== null) {
      GetUsersState(accessToken, setWorkers, { querySelector: "workers" });
      GetJobsState(accessToken, setTasks);
    }
  }, []);

  const ClickJobs = () => {
    GetJobsState(accessToken, setTasks);
    setViews("editjob");
  };

  const ClickUsers = () => {
    setViews("edituser");
  };

  if (views === "editjob") {
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
  } else {
    view = <EditUser setViews={setViews} usrAlert={usrAlert} setUsrAlert={setUsrAlert}></EditUser>;
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
            startIcon={<CalendarToday />}
            onClick={ClickJobs}
          >
            Jobs
          </Button>
          {getUserGroupNumber(userGroup as string) < 2 ? (
            <>
              <Button
                className={classes.buttonStyle}
                variant="contained"
                color="primary"
                startIcon={<PeopleAlt />}
                onClick={ClickUsers}
              >
                Brugere
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
        {view}
      </div>
    </>
  );
};
