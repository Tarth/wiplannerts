import React, { useState } from "react";
import { Job, JobWithWorkers } from "../models/models";
// import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
// import { Column } from "primereact/column";
import { format } from "date-fns";
import {
  DataGrid,
  ColDef,
  ValueFormatterParams,
  RowData,
} from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";

interface JobListProps {
  jobs: Job[];
  selectedTasks: RowData[];
  setSelectedTasks: (job: RowData[]) => void;
}

interface jobsstr {
  description: string;
  start: Date;
  end: Date;
  name: string;
  id: string;
}

export const JobListBox: React.FC<JobListProps> = ({
  jobs,
  selectedTasks,
  setSelectedTasks,
}) => {
  let [jobsstr] = useState<jobsstr[]>([]);

  const columns: ColDef[] = [
    { field: "id", hide: true },
    { field: "description", headerName: "Beskrivelse", width: 300 },
    {
      field: "start",
      headerName: "Start dato",
      width: 150,
      valueFormatter: (params: ValueFormatterParams) =>
        format(params.value as Date, "dd/MM/yy - HH:mm"),
    },
    {
      field: "end",
      headerName: "Slut dato",
      width: 150,
      valueFormatter: (params: ValueFormatterParams) =>
        format(params.value as Date, "dd/MM/yy - HH:mm"),
    },
    { field: "name", headerName: "Navn", width: 300 },
  ];

  // find the jobs with the same id and gather the usernames into 1 entry and display them
  let concatJobs: JobWithWorkers[] = [];
  jobs.forEach((jobItem) => {
    let job = concatJobs.find(
      (concatJobItem) => concatJobItem.id === jobItem.id
    );
    if (job !== undefined) {
      let jobwithworker = job.workers.find(
        (worker) => worker.id === jobItem.worker.id
      );
      if (jobwithworker === undefined) {
        job.workers.push(jobItem.worker);
      }
    } else {
      const newjob: JobWithWorkers = {
        description: jobItem.description,
        end: jobItem.end,
        id: jobItem.id,
        start: jobItem.start,
        workers: [jobItem.worker],
      };
      concatJobs.push(newjob);
    }
  });

  jobsstr = concatJobs.map((x) => ({
    description: x.description,
    start: x.start,
    end: x.end,
    name: x.workers
      .map((y) => {
        return " " + y.name;
      })
      .toString(),
    id: x.id.toString(),
  }));

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 6,
  });

  // TODO: https://github.com/mui-org/material-ui-x/issues/246
  const [selection, setSelection] = React.useState<RowData[]>([]);

  // const paginatorLeft = (
  //   <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  // );
  // const paginatorRight = (
  //   <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  // );
  return (
    <div style={{ width: "60%" }}>
      {/* <DataGrid
        rows={jobsstr}
        columns={columns}
        autoHeight={true}
        pagination
        pageSize={10}
        checkboxSelection={true}
        onSelectionChange={(newSelection) => {
          // setSelectedTasks(newSelection.rows);
          console.log(newSelection.rows);
        }}
      ></DataGrid> */}

      <DataGrid
        checkboxSelection
        onSelectionChange={(newSelection) => {
          setSelection(newSelection.rows);
          console.log(selection);
        }}
        autoHeight={true}
        {...data}
      />
      {/* <DataTable
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
      </DataTable> */}
      <Button
        label="Slet markerede jobs"
        onClick={() => {
          console.log("Click");
        }}
      ></Button>
    </div>
  );
};
