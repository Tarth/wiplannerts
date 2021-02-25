import React, { useState } from "react";
import { JobWithWorkers, jobsstr, JobsStateProps } from "../../models/models";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteJob, GetJobs } from "../../utility/datahandler";
import { DataTable } from "primereact/datatable";
import { EditJobDialog } from "./editJobDialogComponent";
import { Column } from "primereact/column";
import { format } from "date-fns";
import { UserAlertHandler } from "../utilityComponents/userAlertComponent";
import { makeStyles } from "@material-ui/core/styles";

export const JobListBox: React.FC<JobsStateProps> = ({
  description,
  setDescription,
  startDate, // "30/07/20 - 00:00"
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
  usrAlert,
  setUsrAlert,
  isStartValid,
  setIsStartValid,
  isEndValid,
  setIsEndValid,
}) => {
  let [jobsstr] = useState<jobsstr[]>([]);
  let alert;
  const useStyles = makeStyles({
    buttonGrp: {
      marginTop: "50px",
    },
    button: {
      backgroundColor: "#007ad9",
      marginRight: "20px",
      "&:hover": {
        backgroundColor: "#006DCC",
      },
    },
  });

  const classes = useStyles();

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
  tasks.forEach((jobItem) => {
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

  return (
    <div>
      {alert}
      <DataTable
        value={jobsstr}
        dataKey="id"
        paginator
        selection={selectedTasks}
        onSelectionChange={(e) => {
          setSelectedTasks(e.value);
          setDescription(e.value.description);
          setStartDate(e.value.start);
          setEndDate(e.value.end);
          let job = concatJobs.find(
            (element) => element.id === parseInt(e.value.id)
          );
          if (job !== undefined) {
            setSelectedWorkers(job.workers);
          }
        }}
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
      <ButtonGroup className={classes.buttonGrp}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {
            if (selectedTasks.id === -1) {
              setUsrAlert({
                type: "error",
                title: "Fejl!",
                text:
                  "Du skal vælge en post i listen, inden du trykker på slette knappen.",
              });
            } else {
              const returnmsg = DeleteJob(selectedTasks.id);
              returnmsg
                .then(
                  () => {
                    setUsrAlert({
                      type: "success",
                      title: "Succes",
                      text: "Job blev slettet fra kalenderen.",
                    });
                    GetJobs(setTasks);
                  },
                  () => {
                    setUsrAlert({
                      type: "error",
                      title: "Fejl",
                      text:
                        "Job blev ikke slettet pga en fejl. Kontakt Winoto support",
                    });
                  }
                )
                .catch((error) => {
                  setUsrAlert({
                    type: "error",
                    title: "Fejl",
                    text: `Job blev ikke slettet pga en fejl - ${error}. Kontakt Winoto support`,
                  });
                });
            }
          }}
          startIcon={<DeleteIcon />}
        >
          Slet
        </Button>
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
          usrAlert={usrAlert}
          setUsrAlert={setUsrAlert}
          isStartValid={isStartValid}
          setIsStartValid={setIsStartValid}
          isEndValid={isEndValid}
          setIsEndValid={setIsEndValid}
          selectedTasks={selectedTasks}
        ></EditJobDialog>
      </ButtonGroup>
    </div>
  );
};
