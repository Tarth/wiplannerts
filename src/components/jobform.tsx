import React from "react";
import { Button } from "primereact/button";
import { Worker } from "../models";
import { PostWorker } from "../datahandler";
import { DateInput } from "./calendarinput";
import { Description } from "./descriptioninput";
import { WorkerListBox } from "./workerlistbox";

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
  return (
    <form>
      <h3>Beskrivelse:</h3>
      <Description description={description} setDescription={setDescription} />
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
      <Button
        label="Tilføj til kalender"
        onClick={() => {
          PostWorker("Bo");
        }}
      ></Button>
    </form>
  );
};
