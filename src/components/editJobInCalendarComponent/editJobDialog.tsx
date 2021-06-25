import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { Description } from "../utilityComponents/descriptionInput";
import { DateInput } from "../utilityComponents/calendarInput";
import { CheckboxList } from "../utilityComponents/workerListBox";
import { JobFormProp } from "../../models/models";
import { UpdateJob, GetJobs } from "../../utility/datahandler";
import { ResetInputFields } from "../../utility/resetinputfields";

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

  const useStyles = makeStyles({
    button: {
      backgroundColor: "#007ad9",
      "&:hover": {
        backgroundColor: "#006DCC",
      },
    },
  });

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => {
          if (startDate === "" || startDate === undefined) {
            setUsrAlert({
              type: "error",
              title: "Fejl",
              text: "Du skal vælge en post i listen, inden du trykker på slette knappen.",
            });
          } else {
            handleClickOpen();
          }
        }}
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
            Rediger indholdet af de forskellige felter og tryk gem, når du er
            færdig
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
                  text: "En/flere ugyldig(e) indtastninger. Felterne må ikke være tomme.",
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
                          GetJobs(
                            setTasks,
                            localStorage.getItem("accesstoken")
                          );
                        }
                        handleClose();
                      },
                      () => {
                        setUsrAlert({
                          type: "error",
                          title: "Fejl",
                          text: "Job blev ikke tilføjet til kalenderen pga en fejl. Kontakt Winoto support",
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
