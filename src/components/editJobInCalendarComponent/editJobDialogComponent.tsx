import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { Description } from "../utilityComponents/descriptionInputComponent";
import { DateInput } from "../utilityComponents/calendarInputComponent";
import { CheckboxList } from "../utilityComponents/workerListBoxComponent";
import { JobFormProp } from "../../models/models";
import { UpdateJob, GetJobs } from "../../utility/datahandler";
import { ResetInputFields } from "../../utility/resetinputfields";
import TextField from "@material-ui/core/TextField";

export const EditJobDialog: React.FC<JobFormProp> = ({
  description,
  setDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  workers,
  selectedWorkers,
  setSelectedWorkers,
  selectedTasks,
  usrAlert,
  tasks,
  setTasks,
  setUsrAlert,
  isStartValid,
  setIsStartValid,
  isEndValid,
  setIsEndValid,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
      >
        Rediger
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Rediger job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <Description
            description={description}
            setDescription={setDescription}
          ></Description>

          <DateInput
            date={startDate}
            setDate={setStartDate}
            isDateValid={isStartValid}
            setIsDateValid={setIsStartValid}
          ></DateInput>
          <DateInput
            date={endDate}
            setDate={setEndDate}
            isDateValid={isEndValid}
            setIsDateValid={setIsEndValid}
          ></DateInput>
          <CheckboxList
            workers={workers}
            selectedWorkers={selectedWorkers}
            setSelectedWorkers={setSelectedWorkers}
          ></CheckboxList>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              ResetInputFields(
                setDescription,
                setStartDate,
                setEndDate,
                setSelectedWorkers
              );
            }}
            color="primary"
          >
            Fortryd
          </Button>
          <Button
            onClick={() => {
              if (
                description === "" ||
                isStartValid === false ||
                isEndValid === false ||
                workers === []
              ) {
                setUsrAlert({
                  type: "error",
                  title: "Fejl",
                  text:
                    "En/flere ugyldig(e) indtastninger. Felterne må ikke være tomme.",
                });
              } else {
                if (selectedTasks !== undefined) {
                  const returnmsg = UpdateJob(
                    startDate as string,
                    endDate as string,
                    description,
                    selectedWorkers.map((x) => x.id),
                    selectedTasks.id
                  );
                  returnmsg
                    .then(
                      () => {
                        setUsrAlert({
                          type: "success",
                          title: "Succes",
                          text: "Job redigeret",
                        });
                        ResetInputFields(
                          setDescription,
                          setStartDate,
                          setEndDate,
                          setSelectedWorkers
                        );
                        if (setTasks !== undefined) {
                          GetJobs(setTasks);
                        }
                        handleClose();
                      },
                      () => {
                        setUsrAlert({
                          type: "error",
                          title: "Fejl",
                          text:
                            "Job blev ikke tilføjet til kalenderen pga en fejl. Kontakt Winoto support",
                        });
                      }
                    )
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }
            }}
            color="primary"
          >
            Gem
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};