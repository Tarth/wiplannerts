import React, { useState, useEffect } from "react";
import "fontsource-roboto";
import "../css/admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { Button } from "@material-ui/core";
import { PeopleAlt, CalendarToday } from "@material-ui/icons";
import { GetUsersAsState, GetJobsState } from "../utility/datahandler";
import { Worker, Job_Worker, AlertProp, IsUserLoggedInProp } from "../models/models";
import { JobList } from "../components/editJob/editJob";
import { Navigation } from "../components/navigation/navigation";
import { UserList } from "../components/editUser/editUser";
import { UserAlertHandler } from "../components/utilityComponents/userAlert";
import { getUserGroupNumber } from "../utility/usergroups";
import { adminStyles } from "./admin.style";
import { alertStyle } from "../components/utilityComponents/userAlert.style";

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
  const [isStartValid, setIsStartValid] = useState(true);
  const [isEndValid, setIsEndValid] = useState(true);
  const defaultJobText =
    "Udfyld felterne nedenfor og brug derefter knappen i bunden til at tilføje et job til kalenderen.";
  const defaultUserText =
    "Udfyld felterne nedenfor og brug derefter knappen i bunden til at tilføje en bruger.";
  const [userAlert, setUserAlert] = useState<AlertProp>({
    type: "info",
    title: "Information",
    text: defaultJobText,
  });
  const [modalAlert, setModalAlert] = useState<AlertProp>({
    type: "",
    title: "",
    text: "",
  });
  let view;

  const classesAdmin = adminStyles();
  const classesAlert = alertStyle();
  const { buttonStyle } = classesAdmin;
  const { alertDiv } = classesAlert;

  const accessToken: string | null = localStorage.getItem("accesstoken");

  useEffect(() => {
    if (accessToken !== null) {
      GetUsersAsState(accessToken, setWorkers, { querySelector: "workers" });
      GetJobsState(accessToken, setTasks);
    }
  }, []);

  const ClickJobs = () => {
    GetJobsState(accessToken, setTasks);
    setViews("editjob");
    if (userAlert.text !== defaultJobText) {
      setUserAlert({
        type: "info",
        title: "information",
        text: defaultJobText,
      });
    }
  };

  const ClickUsers = () => {
    setViews("edituser");
    setUserAlert({
      type: "info",
      title: "information",
      text: defaultUserText,
    });
  };

  let alert = (
    <div className={alertDiv}>
      <UserAlertHandler
        type={userAlert.type}
        title={userAlert.title}
        text={userAlert.text}
      ></UserAlertHandler>
    </div>
  );

  if (views === "editjob") {
    view = (
      <div className="editjob">
        <JobList
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
          userAlert={userAlert}
          setUserAlert={setUserAlert}
          modalAlert={modalAlert}
          setModalAlert={setModalAlert}
          isStartValid={isStartValid}
          setIsStartValid={setIsStartValid}
          isEndValid={isEndValid}
          setIsEndValid={setIsEndValid}
        />
      </div>
    );
  } else {
    view = (
      <UserList
        setViews={setViews}
        userAlert={userAlert}
        setUserAlert={setUserAlert}
        modalAlert={modalAlert}
        setModalAlert={setModalAlert}
      ></UserList>
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
            className={buttonStyle}
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
                className={buttonStyle}
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
        {alert}
        {view}
      </div>
    </>
  );
};
