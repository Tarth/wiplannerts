import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle>Rediger</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rediger indholdet af de forskellige felter og tryk på Gem når du er færdig
        </DialogContentText>
        <TextField variant="filled" autoFocus label="Brugernavn" value={username}></TextField>
        <TextField variant="filled" label="Password" value={password}></TextField>
        <UserSelectBox
          setUserGroup={setUsergroup}
          setWorkerName={setName}
          userGroup={usergroup}
        ></UserSelectBox>
        <TextField variant="filled" label="Kalendernavn" value={name}></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Slet</Button>
        <Button onClick={handleClose}>Gem</Button>
      </DialogActions>
    </Dialog>
  );
};
