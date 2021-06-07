import React from "react";
import Button from "@material-ui/core/Button";
import { ConfirmationDialogProp } from "../../models/models";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ResetInputFields } from "../../utility/resetinputfields";
import { DeleteJob, GetJobs } from "../../utility/datahandler";

export const ConfirmationDialog: React.FC<ConfirmationDialogProp> = ({
  setStartDate,
  setDescription,
  setEndDate,
  setSelectedWorkers,
  selectedTasks,
  setUsrAlert,
  setTasks,
  startDate,
}) => {
  const [open, setOpen] = React.useState(false);

  const useStyles = makeStyles({
    button: {
      marginRight: "10px",
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
        startIcon={<DeleteIcon />}
      >
        SLET
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Slet opgave?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Er du sikker på at du vil slette den valgte opgave fra listen?
            Bemærk at dit valg ikke kan fortrydes!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              ResetInputFields(
                setStartDate,
                setDescription,
                setEndDate,
                setSelectedWorkers
              );
              handleClose();
            }}
            color="primary"
          >
            Nej
          </Button>
          <Button
            onClick={() => {
              if (selectedTasks.id === -1) {
                setUsrAlert({
                  type: "error",
                  title: "Fejl",
                  text: "Du skal vælge en post i listen, inden du trykker på slette knappen.",
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
                        text: "Job blev ikke slettet pga en fejl. Kontakt Winoto support",
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
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};