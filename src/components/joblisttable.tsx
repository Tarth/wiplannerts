import React, { useState } from "react";
import { Job } from "../models";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { format } from "date-fns";

interface JobListProps {
  jobs: Job[];
  selectedTasks: Job[];
  setSelectedTasks: (job: Job[]) => void;
}

interface jobsstr {
  description: string;
  start: string;
  end: string;
  name: string;
}

export const JobListBox: React.FC<JobListProps> = ({
  jobs,
  selectedTasks,
  setSelectedTasks,
}) => {
  let [jobsstr] = useState<jobsstr[]>([]);

  jobsstr = jobs.map((x) => ({
    description: x.description,
    start: format(x.start, "dd/MM/yy - HH:mm"),
    end: format(x.end, "dd/MM/yy - HH:mm"),
    name: x.username,
  }));

  console.log(jobs);
  return (
    <div>
      <DataTable value={jobsstr}>
        <Column field="description" header="Beskrivelse"></Column>
        <Column field="start" header="Start dato"></Column>
        <Column field="end" header="Slut dato"></Column>
        <Column field="name" header="Navn"></Column>
      </DataTable>
    </div>
  );
};
