import React, { useState } from "react";
import { Job_WorkerArray, Jobsstr, JobsStateProps } from "../../models/models";
import { ButtonGroup, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { EditJobDialog } from "./editJobDialog";
import { format } from "date-fns";
import { useStyleJobListTable } from "./style";
import { AddJobForm } from "../addJob/addJob";
export const JobList: React.FC<JobsStateProps> = ({
  description,
  setDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  workers,
  selectedWorkers,
  setSelectedWorkers,
  tasks,
  setTasks,
  selectedTasks,
  setSelectedTasks,
  userAlert,
  setUserAlert,
  isStartValid,
  setIsStartValid,
  isEndValid,
  setIsEndValid,
  modalAlert,
  setModalAlert,
}) => {
  let [jobsstr] = useState<Jobsstr[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const classes = useStyleJobListTable();

  // find the jobs with the same id and gather the usernames into 1 entry and display them
  let concatJobs: Job_WorkerArray[] = [];
  tasks.forEach((jobItem) => {
    let job = concatJobs.find((concatJobItem) => concatJobItem.id === jobItem.id);
    if (job !== undefined) {
      let jobwithworker = job.workers.find((worker) => worker.id === jobItem.worker.id);
      if (jobwithworker === undefined) {
        job.workers.push(jobItem.worker);
      }
    } else {
      const newjob: Job_WorkerArray = {
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

  function RowClick(e: any) {
    setSelectedTasks(e.data);
    setDescription(e.data.description);
    setStartDate(e.data.start);
    setEndDate(e.data.end);
    let job = concatJobs.find((element) => element.id === parseInt(e.data.id));
    if (job !== undefined) {
      setSelectedWorkers(job.workers);
    }
    setOpenModal(true);
  }

  function AddJobClick() {
    setOpenAddModal(true);
  }

  return (
    <div>
      <IconButton onClick={AddJobClick} color="primary" aria-label="Tilføj job">
        <Add></Add>
      </IconButton>
      <DataTable
        value={jobsstr}
        dataKey="id"
        paginator
        onRowClick={RowClick}
        selectionMode="single"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Viser {first} til {last} af {totalRecords}"
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column
          field="start"
          header="Start dato"
          filter
          sortable
          filterMatchMode="contains"
          filterPlaceholder="Søg dato"
        ></Column>
        <Column
          field="end"
          header="Slut dato"
          filter
          sortable
          filterMatchMode="contains"
          filterPlaceholder="Søg dato"
        ></Column>
        <Column
          field="description"
          header="Beskrivelse"
          filter
          sortable
          filterMatchMode="contains"
          filterPlaceholder="Søg beskrivelse"
        ></Column>
        <Column
          field="name"
          header="Navn"
          filter
          sortable
          filterPlaceholder="Søg navn"
          filterMatchMode="contains"
        ></Column>
      </DataTable>
      <ButtonGroup className={classes.buttonGrp}>
        <EditJobDialog
          description={description}
          setDescription={setDescription}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          workers={workers}
          selectedWorkers={selectedWorkers}
          setSelectedWorkers={setSelectedWorkers}
          tasks={tasks}
          setTasks={setTasks}
          userAlert={userAlert}
          setUserAlert={setUserAlert}
          isStartValid={isStartValid}
          setIsStartValid={setIsStartValid}
          isEndValid={isEndValid}
          setIsEndValid={setIsEndValid}
          selectedTasks={selectedTasks}
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalAlert={modalAlert}
          setModalAlert={setModalAlert}
        ></EditJobDialog>
      </ButtonGroup>
      <AddJobForm
        description={description}
        setDescription={setDescription}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        workers={workers}
        selectedWorkers={selectedWorkers}
        setSelectedWorkers={setSelectedWorkers}
        tasks={tasks}
        setTasks={setTasks}
        userAlert={userAlert}
        setUserAlert={setUserAlert}
        isStartValid={isStartValid}
        setIsStartValid={setIsStartValid}
        isEndValid={isEndValid}
        setIsEndValid={setIsEndValid}
        selectedTasks={selectedTasks}
        openModal={openAddModal}
        setOpenModal={setOpenAddModal}
        modalAlert={modalAlert}
        setModalAlert={setModalAlert}
      ></AddJobForm>
    </div>
  );
};
