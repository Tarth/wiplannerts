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
  selectedUser,
}) => {
  const [userName, setUserName] = useState(selectedUser.username);
  const [password, setPassword] = useState(selectedUser.password);
  // const [userGroup, setUserGroup] = useState(selectedUser.usergroup_id);
  const [userGroup, setUserGroup] = useState("worker");
  // const [workerName, setWorkerName] = useState(selectedUser.name);
  const [workerName, setWorkerName] = useState("");

  useEffect(() => {
    setWorkerName(selectedUser.name);
  }, []);

  const useStyles = makeStyles({
    button: {
      marginRight: "10px",
      backgroundColor: "#007ad9",
      "&:hover": {
        backgroundColor: "#006DCC",
      },
    },
  });
  console.log(selectedUser.name);

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
        <TextField variant="filled" autoFocus label="Brugernavn" value={userName}></TextField>
        <TextField variant="filled" label="Password" value={password}></TextField>
        <UserSelectBox
          setUserGroup={setUserGroup}
          setWorkerName={setWorkerName}
          userGroup={userGroup}
        ></UserSelectBox>
        <TextField variant="filled" label="Kalendernavn" value={workerName}></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Slet</Button>
        <Button onClick={handleClose}>Gem</Button>
      </DialogActions>
    </Dialog>
  );
};
