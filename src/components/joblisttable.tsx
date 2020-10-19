import React, { useState } from "react";
import { Job, JobWithWorkers } from "../models/models";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { format } from "date-fns";
import { AlertProp, UserAlertHandler } from "./useralert";

interface JobListProps {
  jobs: Job[];
  selectedTasks: Job[];
  setSelectedTasks: (job: Job[]) => void;
  usrAlert: AlertProp;
  setUsrAlert: (usrAlert: AlertProp) => void;
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
  usrAlert,
  setUsrAlert,
}) => {
  let [jobsstr] = useState<jobsstr[]>([]);
  let alert;

  alert = (
    <div className="alertDiv">
      <UserAlertHandler
        type={usrAlert.type}
        title={usrAlert.title}
        text={usrAlert.text}
      ></UserAlertHandler>
    </div>
  );

  
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

  // convert the datatypes to strings, so they can be displayed in the data table
  jobsstr = concatJobs.map((x) => ({
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

  // const paginatorLeft = (
  //   <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  // );
  // const paginatorRight = (
  //   <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  // );

  return (
    <div>
      {alert}
      <DataTable
        value={jobsstr}
        dataKey="id"
        paginator
        selection={selectedTasks}
        onSelectionChange={(e) => setSelectedTasks(e.value)}
        selectionMode="single"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Viser {first} til {last} af {totalRecords}"
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
        // paginatorLeft={paginatorLeft}
        // paginatorRight={paginatorRight}
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
        variant="contained"
        color="primary"
        onClick={() => console.log("Click")}
        startIcon={<DeleteIcon />}
      >
        Slet markeret job
      </Button>
    </div>
  );
};
