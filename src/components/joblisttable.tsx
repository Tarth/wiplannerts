import React, { useState } from "react";
import { Job } from "../models";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
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
  let [selectedDate, setSelectedDate] = useState<Date | Date[]>();

  // let allIdsFromDB: Number[] = jobs.map((x) => x.id);
  // let uniqIds = allIdsFromDB.filter((id, index) => {
  //   return allIdsFromDB.indexOf(id) === index;
  // });

  jobs.filter((x) => jobs.indexOf(x.id) === )

  jobsstr = jobs.map((x) => ({
    description: x.description,
    start: format(x.start, "dd/MM/yy - HH:mm"),
    end: format(x.end, "dd/MM/yy - HH:mm"),
    name: x.username,
    id: x.id.toString(),
  }));

  // console.log(jobs);
  // console.log(selectedTasks);

  const dateFilter = (
    <Calendar
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.value)}
      dateFormat="dd/MM/yy"
      className="p-column-filter"
      placeholder="Registration Date"
    />
  );

  const filterDate = (value: string, filter: Date | Date[] | undefined) => {
    if (filter === undefined || filter === null) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === format(filter as Date, "dd/MM/yy");
  };

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
        paginator
        selection={selectedTasks}
        onSelectionChange={(e) => setSelectedTasks(e.value)}
        selectionMode="multiple"
        dataKey="id"
        metaKeySelection={false}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Viser {first} til {last} af {totalRecords}"
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
      >
        <Column field="id" header="ID"></Column>
        <Column
          field="start"
          header="Start dato"
          filter
          filterElement={dateFilter}
          filterFunction={(e) => filterDate(e.value, selectedDate)}
        ></Column>
        <Column field="end" header="Slut dato"></Column>
        <Column field="description" header="Beskrivelse"></Column>
        <Column
          field="name"
          header="Navn"
          filter
          filterPlaceholder="Søg navn"
        ></Column>
      </DataTable>
    </div>
  );
};
