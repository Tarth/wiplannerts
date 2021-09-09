import React, { useState, useEffect } from "react";
import "../css/admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { GetUsers, GetJobs } from "../utility/datahandler";
import { ResetInputFields } from "../utility/resetinputfields";
import { Worker, Job_Worker, AlertProp, IsUserLoggedInProp } from "../models/models";
import { AddJobForm } from "../components/addJobToCalendarComponent/jobform";
import { JobListBox } from "../components/editJobInCalendarComponent/jobListTable";
import { Navigation } from "../components/navigation/navigation";
import { AddUser } from "../components/addUser/addUser";
import { EditUser } from "../components/editUser/editUser";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import PersonAdd from "@material-ui/icons/PersonAdd";
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
      GetUsers(accessToken, setWorkers, { querySelector: "workers" });
      GetJobs(setTasks, accessToken);
    }
  }, []);

  const HandleClickAddJob = () => {
    if (accessToken !== null) {
      GetUsers(accessToken, setWorkers, { querySelector: "workers" });
    }
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
      ResetInputFields(setDescription, setStartDate, setEndDate, setSelectedWorkers);
    }
  };

  const HandleClickEditJob = () => {
    GetJobs(setTasks, accessToken);
    setViews("editjob");
    const defaultInfoText =
      "Marker et af jobbene i tabellen nedenfor, og brug derefter knapperne i bunden til at slette/redigere det valgte. NB: På nuværende tidspunkt kan der desværre kun ændres et job ad gangen.";
    if (usrAlert.text !== defaultInfoText) {
      setUsrAlert({
        type: "info",
        title: "Information",
        text: defaultInfoText,
      });
    }
  };

  const HandleClickAddUser = () => {
    setViews("adduser");
    const defaultInfoText =
      "Udfyld felterne nedenfor og brug derefter knappen i bunden til at tilføje en ny bruger til databasen.";
    if (usrAlert.text !== defaultInfoText) {
      setUsrAlert({
        type: "info",
        title: "Information",
        text: defaultInfoText,
      });
    }
  };

  const HandleClickEditUser = () => {
    setViews("edituser");
    const defaultInfoText =
      "Udfyld felterne nedenfor og brug derefter knappen i bunden til at tilføje en ny bruger til databasen.";
    if (usrAlert.text !== defaultInfoText) {
      setUsrAlert({
        type: "info",
        title: "Information",
        text: defaultInfoText,
      });
    }
  };

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
  } else if (views === "editjob") {
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
  } else if (views === "adduser") {
    view = <AddUser usrAlert={usrAlert} setUsrAlert={setUsrAlert} />;
  } else {
    view = <EditUser></EditUser>;
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
            onClick={HandleClickAddJob}
          >
            Tilføj Job
          </Button>
          <Button
            className={classes.buttonStyle}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={HandleClickEditJob}
          >
            Rediger Job
          </Button>
          {getUserGroupNumber(userGroup as string) < 2 ? (
            <>
              <Button
                className={classes.buttonStyle}
                variant="contained"
                color="primary"
                startIcon={<PersonAdd />}
                onClick={HandleClickAddUser}
              >
                Tilføj Bruger
              </Button>
              <Button
                className={classes.buttonStyle}
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={HandleClickEditUser}
              >
                Rediger Bruger
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
