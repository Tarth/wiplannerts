import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";
import { Worker } from "../models";
import { PostJob } from "../datahandler";
import { DateInput } from "./calendarinput";
import { Description } from "./descriptioninput";
import { CheckboxList } from "./workerlistbox";

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

      <CheckboxList
        workers={workers}
        selectedWorkers={selectedWorkers}
        setSelectedWorkers={setSelectedWorkers}
      ></CheckboxList>

      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={() => {
          if (
            description === "" ||
            startDate === "" ||
            endDate === "" ||
            workers === []
          ) {
          } else {
            PostJob(
              startDate as string,
              endDate as string,
              description,
              selectedWorkers.map((x) => x.id)
            );
          }
        }}
      >
        Tilføj til kalender
      </Button>
    </form>
  );
};
