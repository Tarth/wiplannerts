import React, { useEffect, useState } from "react";
import { useStylesDialog } from "./style";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import { EditUserDialogProp } from "../../models/models";
import { UserSelectBox } from "../utilityComponents/elements/userSelectBox";

export const EditUserDialog: React.FC<EditUserDialogProp> = ({
  openModal,
  setOpenModal,
  username,
  setUsername,
  password,
  setPassword,
  usergroup,
  setUsergroup,
  name,
  setName,
}) => {
  const classes = useStylesDialog();

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle>Rediger</DialogTitle>
      <DialogContent className={classes.container}>
        <DialogContentText>
          Rediger indholdet af de forskellige felter og tryk på Gem når du er færdig
        </DialogContentText>
        <TextField
          variant="filled"
          autoFocus
          label="Brugernavn"
          value={username}
          className={classes.dialogInput}
        ></TextField>
        <TextField
          variant="filled"
          label="Password"
          value={password}
          className={classes.dialogInput}
        ></TextField>
        <div className={classes.dialogInput}>
          <UserSelectBox
            setUserGroup={setUsergroup}
            setWorkerName={setName}
            userGroup={usergroup}
          ></UserSelectBox>
        </div>
        <TextField
          variant="filled"
          label="Kalendernavn"
          value={name}
          className={classes.dialogInput}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Slet</Button>
        <Button onClick={handleClose}>Gem</Button>
      </DialogActions>
    </Dialog>
  );
};
