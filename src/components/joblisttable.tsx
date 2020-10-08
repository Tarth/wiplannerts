import React, { useState } from "react";
import { Job, JobWithWorkers } from "../models";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
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
  id: string;
}

export const JobListBox: React.FC<JobListProps> = ({
  jobs,
  selectedTasks,
  setSelectedTasks,
}) => {
  let [jobsstr] = useState<jobsstr[]>([]);
  // find the jobs with the same id and gather the usernames into 1 entry and display them

  let concatJobs2: JobWithWorkers[] = [];

  jobs.forEach((x) => {
    let job = concatJobs2.find((y) => y.id === x.id);

    if (job !== undefined) {
      let jobwithworker = job.workers.find((z) => z.id === x.worker.id);
      if (jobwithworker === undefined) {
        job.workers.push(x.worker);
      }
    } else {
      const newjob: JobWithWorkers = {
        description: x.description,
        end: x.end,
        id: x.id,
        start: x.start,
        workers: [x.worker],
      };
      concatJobs2.push(newjob);
    }
  });
  console.log(concatJobs2);

  // convert the datatypes to strings, so they can be displayed in the data table
  jobsstr = concatJobs2.map((x) => ({
    description: x.description,
    start: format(x.start, "dd/MM/yy - HH:mm"),
    end: format(x.end, "dd/MM/yy - HH:mm"),
    name: x.workers
      .map((y) => {
        return " " + y.name;
      })
      .toString(),
    id: x.id.toString(),
  }));

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );
  return (
    <div>
      <DataTable
        value={jobsstr}
        editMode="row"
        onRowEditInit={() => console.log("RowInit")}
        onRowEditCancel={() => console.log("Row Cancel")}
        dataKey="id"
        paginator
        selection={selectedTasks}
        onSelectionChange={(e) => setSelectedTasks(e.value)}
        selectionMode="multiple"
        metaKeySelection={false}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Viser {first} til {last} af {totalRecords}"
        rows={20}
        rowsPerPageOptions={[10, 20, 50]}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
      >
        <Column
          field="start"
          header="Start dato"
          filter
          filterMatchMode="contains"
          filterPlaceholder="Søg dato"
        ></Column>
        <Column
          field="end"
          header="Slut dato"
          filter
          filterMatchMode="contains"
          filterPlaceholder="Søg dato"
        ></Column>
        <Column
          field="description"
          header="Beskrivelse"
          filter
          filterMatchMode="contains"
          filterPlaceholder="Søg beskrivelse"
        ></Column>
        <Column
          field="name"
          header="Navn"
          filter
          filterPlaceholder="Søg navn"
          filterMatchMode="contains"
        ></Column>
      </DataTable>
      <Button
        label="Slet markerede jobs"
        onClick={() => {
          console.log("Click");
        }}
      ></Button>
    </div>
  );
};
