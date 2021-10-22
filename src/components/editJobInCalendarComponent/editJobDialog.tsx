import React from "react";
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
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { JobFormProp } from "../../models/models";
import { UpdateJob, GetJobsState } from "../../utility/datahandler";
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
  const HandleClickOpen = () => {
    setOpen(true);
  };

  const HandleClose = () => {
    setOpen(false);
    ResetInputFields(setDescription, setStartDate, setEndDate, setSelectedWorkers);
  };

  function InvalidInput() {
    if (
      description === "" ||
      isStartValid === false ||
      isEndValid === false ||
      selectedWorkers.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  function NoItemSelected() {
    if (startDate === "" || startDate === undefined) {
      setUsrAlert({
        type: "error",
        title: "Fejl",
        text: "Du skal vælge en post i listen, inden du trykker på slette knappen.",
      });
    } else {
      HandleClickOpen();
    }
  }

  const HandleClickSave = async () => {
    if (InvalidInput()) {
      setUsrAlert({
        type: "error",
        title: "Fejl",
        text: "En/flere ugyldig(e) indtastninger. Felterne må ikke være tomme.",
      });
    } else {
      try {
        if (selectedTasks !== undefined) {
          await UpdateJob(
            startDate as string,
            endDate as string,
            description,
            selectedWorkers.map((x) => x.id),
            selectedTasks.id,
            localStorage.getItem("accesstoken")
          );
          setUsrAlert({
            type: "success",
            title: "Succes",
            text: "Job redigeret",
          });
          if (setTasks !== undefined) {
            GetJobsState(localStorage.getItem("accesstoken"), setTasks);
          }
          HandleClose();
        }
      } catch (error) {
        setUsrAlert({
          type: "error",
          title: "Fejl",
          text: `Job blev ikke tilføjet - ${error}. Kontakt Winoto support`,
        });
      }
    }
  };

  return (
    <div>
      <ButtonWrapper
        className={classes.button}
        onClick={NoItemSelected}
        caption="Rediger"
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
      ></ButtonWrapper>
      <Dialog open={open} onClose={HandleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Rediger job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rediger indholdet af de forskellige felter og tryk gem, når du er færdig
          </DialogContentText>
          <Description description={description} setDescription={setDescription}></Description>
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
          <ButtonWrapper
            onClick={HandleClose}
            caption="Fortryd"
            color="default"
            variant="text"
          ></ButtonWrapper>
          <ButtonWrapper
            onClick={HandleClickSave}
            caption="Gem"
            color="primary"
            variant="text"
          ></ButtonWrapper>
        </DialogActions>
      </Dialog>
    </div>
  );
};
