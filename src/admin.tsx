import React, { useState } from "react";
import "./admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
// import { Button } from "primereact/button";
import { GetWorkers, GetJobs } from "./datahandler";
import { Worker, Job } from "./models";
import { AddJobForm } from "./components/jobform";
import { JobListBox } from "./components/joblisttable";
import Button from "@material-ui/core/Button";
import "fontsource-roboto";

export const EntryForm: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([]);
  const [tasks, setTasks] = useState<Job[]>([]); //This state has all jobs fetched from DB
  const [selectedTasks, setSelectedTasks] = useState<Job[]>([]);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [views, setViews] = useState<string>("addjob"); // This state controls which view is drawn on the admin page
  let view;

  if (workers.length === 0) {
    GetWorkers(setWorkers);
  }

  if (tasks.length === 0) {
    GetJobs(setTasks);
  }

  console.log(selectedWorkers);
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
        />
      </div>
    );
  }

  return (
    <div className="body">
      <div className="buttongroup">
        {/* <Button
          className="addJobButton"
          label="Tilføj job"
          icon="pi pi-plus"
          onClick={() => setViews("addjob")}
        ></Button>
        <Button
          className="editJobButton"
          label="Rediger job"
          icon="pi pi-pencil"
          onClick={() => setViews("")}
        ></Button> */}
        <Button variant="contained" onClick={() => setViews("addjob")}>
          Tilføj Job
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setViews("")}
        >
          Rediger Job
        </Button>
      </div>
      {view}
    </div>
  );
};
