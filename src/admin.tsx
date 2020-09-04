import React, { useState } from "react";
import "./admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { GetWorkers, GetJobs } from "./datahandler";
import { Worker, Job } from "./models";
import { DateInput } from "./components/calendarinput";
import { Description } from "./components/descriptioninput";
import { WorkerListBox } from "./components/workerlistbox";
import { JobListBox } from "./components/joblistbox";

export const EntryForm: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([]);
  const [tasks, setTasks] = useState<Job[]>([]); //This state has all jobs fetched from DB
  const [selectedTasks, setSelectedTasks] = useState<Job[]>([]); //This state has all jobs fetched from DB
  const [startDate, setStartDate] = useState<Date | Date[]>([]);
  const [endDate, setEndDate] = useState<Date | Date[]>([]);
  const [description, setDescription] = useState<string>("");

  if (workers.length === 0) {
    GetWorkers(setWorkers);
  }

  if (tasks.length === 0) {
    GetJobs(setTasks);
  }

  return (
    <div className="body">
      <form>
        <h1>Tilføj malerjob:</h1>
        <h3>Beskrivelse:</h3>
        <Description
          description={description}
          setDescription={setDescription}
        />
        <h3>Start dato:</h3>
        <DateInput date={startDate} setDate={setStartDate} />
        <h3>Slut dato:</h3>
        <DateInput date={endDate} setDate={setEndDate} />
        <h3>Tilføj medarbejdere:</h3>
        <WorkerListBox
          workers={workers}
          selectedWorkers={selectedWorkers}
          setSelectedWorkers={setSelectedWorkers}
        />
      </form>

      <div className="deleteworker">
        <JobListBox
          jobs={tasks}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />
      </div>
    </div>
  );
};
