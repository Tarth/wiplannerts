import React from "react";
import { ListBox } from "primereact/listbox";
import { Job } from "../models";

interface JobListProps {
  jobs: Job[];
  selectedTasks: Job[];
  setSelectedTasks: (job: Job[]) => void;
}

export const JobListBox: React.FC<JobListProps> = ({
  jobs,
  selectedTasks,
  setSelectedTasks,
}) => {
  console.log(jobs);
  return (
    <ListBox
      optionLabel="job"
      value={selectedTasks}
      options={jobs}
      onChange={(e) => {
        setSelectedTasks(e.value);
      }}
    />
  );
};
