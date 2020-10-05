import React, { useState } from "react";
import { Job } from "../models";
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
  let prevId = 0;
  let str = "";

  let concatJobs = jobs.map((x, index, arr) => {
    if (x.id === prevId) {
      const objIndex = arr.findIndex((obj) => obj.id === x.id);
      str = str.concat(", " + x.username);
      arr[objIndex].username = str;
      arr.splice(index, 1);
    } else {
      str = x.username;
    }
    prevId = x.id;
    // return x;
  });

  console.log(concatJobs);
  // convert the datatypes to strings, so they can be displayed in the data table
  jobsstr = jobs.map((x) => ({
    description: x.description,
    start: format(x.start, "dd/MM/yy - HH:mm"),
    end: format(x.end, "dd/MM/yy - HH:mm"),
    name: x.username,
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
