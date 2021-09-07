import React, { useState } from "react";
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
import { DeleteUser, GetWorkers } from "../../utility/datahandler";
import { AlertDialog } from "./confirmationDialog";

export const EditUserDialog: React.FC<EditUserDialogProp> = ({
  openModal,
  setOpenModal,
  username,
  setUsername,
  setPassword,
  usergroup,
  setUsergroup,
  name,
  setName,
  userId,
  setUsers,
}) => {
  const classes = useStylesDialog();
  const [password] = useState("");
  const accessToken = localStorage.getItem("accesstoken");

  const HandleCloseSave = () => {
    HandleClose();
  };

  const HandleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onClose={HandleClose}>
      <DialogTitle>Rediger</DialogTitle>
      <DialogContent className={classes.container}>
        <DialogContentText>
          Rediger indholdet af de forskellige felter og tryk på Gem når du er færdig
        </DialogContentText>
        <div className={classes.userInputWrapper}>
          <div className={classes.dialogInput}>
            <UserSelectBox
              setUserGroup={setUsergroup}
              setWorkerName={setName}
              userGroup={usergroup}
            ></UserSelectBox>
          </div>
          <TextField
            variant="filled"
            label="Brugernavn"
            value={username}
            className={classes.dialogInput}
          ></TextField>
          <TextField
            variant="filled"
            label="Kalendernavn"
            value={name}
            className={classes.dialogInput}
          ></TextField>
        </div>
        <div className={classes.passwordWrapper}>
          <TextField
            variant="filled"
            label="Password"
            value={password}
            className={classes.dialogInput}
          ></TextField>
          <TextField
            variant="filled"
            label="Gentag password"
            value={password}
            className={classes.dialogInput}
          ></TextField>
        </div>
      </DialogContent>
      <DialogActions>
        <AlertDialog userId={userId} setUsers={setUsers}></AlertDialog>
        <Button onClick={HandleCloseSave}>Gem</Button>
      </DialogActions>
    </Dialog>
  );
};
