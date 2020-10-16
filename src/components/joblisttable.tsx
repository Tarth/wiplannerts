import React, { useState } from "react";
import { Job, JobWithWorkers } from "../models/models";
import { Button } from "primereact/button";
import {
  DataGrid,
  ColDef,
  ValueFormatterParams,
  RowData,
} from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import { format } from "date-fns";

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
    start: x.start,
    end: x.end,
    name: x.workers
      .map((y) => {
        return " " + y.name;
      })
      .toString(),
    id: x.id.toString(),
  }));

  const columns: ColDef[] = [
    { field: "description", headerName: "Beskrivelse", width: 300 },
    { field: "start", headerName: "Start dato", width: 150 },
    { field: "end", headerName: "Slut data", width: 150 },
    { field: "name", headerName: "Navn", width: 300 },
    { field: "id", hide: true },
  ];

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 6,
  });

  return (
    <div>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          checkboxSelection
          onSelectionChange={(newSelection) => {
            // setSelectedTasks(newSelection.rows);
            // console.log(selectedTasks);
          }}
          {...data}
        />
      </div>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={jobsstr}
          columns={columns}
          pagination
          autoPageSize
          checkboxSelection
          onSelectionChange={(userSelection) => {
            // setSelectedTasks(userSelection.rows); //this causes infinite state updates
            // console.log(selectedTasks);
          }}
        />
      </div>
      <Button
        label="Slet markerede jobs"
        onClick={() => {
          console.log("Click");
        }}
      ></Button>
    </div>
  );
};
