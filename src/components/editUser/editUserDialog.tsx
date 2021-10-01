import React, { useState, useRef } from "react";
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
import { DeleteUserDialog } from "./confirmationDialog";

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
  userId,
  setUsers,
  setUserAlert,
}) => {
  const classes = useStylesDialog();
  const [tempPassword, setTempPassword] = useState("");
  const [tempRepeatedPassword, setTempRepeatedPassword] = useState("");

  const HandleCloseSave = () => {
    HandleClose();
  };

  const HandleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onClose={HandleClose} className={classes.container}>
      <DialogTitle>Rediger/slet</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rediger indholdet af de forskellige felter og tryk på Gem når du er færdig
        </DialogContentText>
        <div className={classes.userInputWrapper}>
          <div className={classes.dialogInput}>
            <UserSelectBox
              setUserGroup={setUsergroup}
              workerName={name}
              setWorkerName={setName}
              userGroup={usergroup}
            ></UserSelectBox>
          </div>
          <TextField
            className={classes.dialogInput}
            variant="filled"
            label="Brugernavn"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></TextField>
          <TextField
            className={classes.dialogInput}
            variant="filled"
            label="Kalendernavn"
            value={name}
            disabled={usergroup !== "worker" ? true : false}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></TextField>
        </div>
        <div className={classes.passwordWrapper}>
          <TextField
            variant="filled"
            label="Password"
            value={tempPassword}
            className={classes.dialogInput}
            onChange={(e) => {
              setTempPassword(e.target.value);
            }}
          ></TextField>
          <TextField
            variant="filled"
            label="Gentag password"
            value={tempRepeatedPassword}
            className={classes.dialogInput}
            onChange={(e) => {
              setTempRepeatedPassword(e.target.value);
            }}
          ></TextField>
        </div>
      </DialogContent>
      <DialogActions>
        <DeleteUserDialog
          userId={userId}
          setUsers={setUsers}
          HandleClose={HandleClose}
          setUserAlert={setUserAlert}
        ></DeleteUserDialog>
        <Button onClick={HandleClose}>Annuller</Button>
        <Button onClick={HandleCloseSave}>Gem</Button>
      </DialogActions>
    </Dialog>
  );
};
