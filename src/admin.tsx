import React, { useState } from "react";
import "./css/admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { GetWorkers, GetJobs } from "./datahandler";
import { Worker, Job } from "./models/models";
import { AlertProp } from "./components/useralert";
import { AddJobForm } from "./components/jobform";
import { JobListBox } from "./components/joblisttable";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import "fontsource-roboto";

export const EntryForm: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([]);
  const [tasks, setTasks] = useState<Job[]>([]); //This state has all jobs fetched from DB
  const [selectedTasks, setSelectedTasks] = useState<Job[]>([]);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [views, setViews] = useState<string>(""); // This state controls which view is drawn on the admin page
  const [usrAlert, setUsrAlert] = useState<AlertProp>({
    type: undefined,
    title: "",
    text: "",
  });
  let view;

  if (workers.length === 0) {
    GetWorkers(setWorkers);
  }

  if (tasks.length === 0) {
    GetJobs(setTasks);
  }

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
        ></AddJobForm>
      </div>
    );
  } else {
    view = (
      <div className="deleteworker">
        <JobListBox
          jobs={tasks}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
          usrAlert={usrAlert}
          setUsrAlert={setUsrAlert}
        />
      </div>
    );
  }

  return (
    <div className="body">
      <div className="buttongroup">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setViews("addjob");
            setUsrAlert({
              type: "info",
              title: "Information",
              text:
                "Udfyld felterne nedenfor og brug derefter knappen i bunden til at tilføje et job til kalenderen.",
            });
          }}
        >
          Tilføj Job
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => {
            GetJobs(setTasks);
            setViews("");
            setUsrAlert({
              type: "info",
              title: "Information",
              text:
                "Marker et af jobbene i tabellen nedenfor, og brug derefter knapperne i bunden til at slette/redigere det valgte. NB: På nuværende tidspunkt kan der desværre kun ændres et job ad gangen",
            });
          }}
        >
          Rediger Job
        </Button>
      </div>
      {view}
    </div>
  );
};
