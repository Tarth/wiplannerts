import React, { useState } from "react";
import "./css/admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { GetWorkers, GetJobs } from "./datahandler";
import { Worker, Job } from "./models/models";
import { AddJobForm } from "./components/jobform";
import { JobListBox } from "./components/joblisttable";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Create";
import { RowData } from "@material-ui/data-grid";
import "fontsource-roboto";

export const EntryForm: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([]);
  const [tasks, setTasks] = useState<Job[]>([]); //This state has all jobs fetched from DB
  const [selectedTasks, setSelectedTasks] = useState<RowData[]>([]);
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
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setViews("addjob")}
        >
          Tilføj Job
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => setViews("")}
        >
          Rediger Job
        </Button>
      </div>
      {view}
    </div>
  );
};
