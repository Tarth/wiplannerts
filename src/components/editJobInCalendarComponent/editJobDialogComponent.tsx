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

export function FormDialog() {
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
          <Description></Description>
          <DateInput></DateInput>
          <DateInput></DateInput>
          <CheckboxList></CheckboxList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fortryd
          </Button>
          <Button onClick={handleClose} color="primary">
            Gem
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
