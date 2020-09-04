import React, { useState } from "react";
import { Job } from "../models";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface JobListProps {
  jobs: Job[];
  selectedTasks: Job[];
  setSelectedTasks: (job: Job[]) => void;
}

interface jobsstr {
  description: string;
  start: string;
  end: string;
}
export const JobListBox: React.FC<JobListProps> = ({
  jobs,
  selectedTasks,
  setSelectedTasks,
}) => {
  // lav nyt array hvor tingene er konverteret til et string array
  let [jobsstr] = useState<jobsstr>();
  jobsstr = jobs.map((x) => ({
    description: x.description,
    start: x.start.toString,
    end: x.end.toString,
  }));

  return (
    <div>
      <DataTable value={jobs}>
        <Column field="description" header="Beskrivelse"></Column>
        <Column field="username" header="Navn"></Column>
      </DataTable>
    </div>
  );
};
