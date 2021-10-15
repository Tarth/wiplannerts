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
import { EditUserDialogProp, AlertProp } from "../../models/models";
import { UserSelectBox } from "../utilityComponents/elements/userSelectBox";
import { DeleteUserDialog } from "./confirmationDialog";
import { UpdateUser, GetUsersState } from "../../utility/datahandler";
import { UserAlertHandler } from "../utilityComponents/userAlert";

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
  const [error, setError] = useState(false);
  const [usrAlert, setUsrAlert] = useState<AlertProp>({
    type: undefined,
    title: "",
    text: "",
  });

  const isBothPasswordsEqual = (password1: string, password2: string) => {
    if (password1 === password2) {
      return true;
    } else {
      return false;
    }
  };

  const IsCharsInvalid = (input: string) => {
    const invalidInput = /[!"#$%/{()=}?+<>*[\]']/g;
    if (invalidInput.test(input)) {
      return true;
    } else {
      return false;
    }
  };

  const IsInputInvalid = (input: string | string[]) => {
    if (input.length === 0 || IsCharsInvalid) {
      return true;
    } else {
      return false;
    }
  };

  const CloseAndSave = () => {
    let _password = "";
    const accessToken = localStorage.getItem("accesstoken");
    if (
      username.length === 0 ||
      tempPassword !== tempRepeatedPassword ||
      (usergroup === "worker" && name.length === 0)
    ) {
      setUsrAlert({
        type: "error",
        title: "Fejl",
        text: "Et eller flere felter er ugyldige/tomme",
      });
      setError(true);
      return;
    }
    if (tempPassword.length === 0 && tempRepeatedPassword.length === 0) {
      _password = password;
    } else {
      _password = tempPassword;
    }
    UpdateUser(username, usergroup, _password, accessToken as string, userId, name);
    GetUsersState(accessToken as string, setUsers);
    setError(false);
    Close();
  };

  const Close = () => {
    setOpenModal(false);
  };

  let alert = (
    <div className="alertDiv">
      <UserAlertHandler
        type={usrAlert.type}
        title={usrAlert.title}
        text={usrAlert.text}
      ></UserAlertHandler>
    </div>
  );

  return (
    <Dialog open={openModal} onClose={Close} className={classes.container}>
      <DialogTitle>Rediger/slet</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rediger indholdet af de forskellige felter og tryk på Gem når du er færdig
        </DialogContentText>
        {alert}
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
            error={error ? true : false}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></TextField>
          <TextField
            className={classes.dialogInput}
            variant="filled"
            label="Kalendernavn"
            value={name}
            error={error ? true : false}
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
            error={error ? true : false}
            onChange={(e) => {
              setTempPassword(e.target.value);
            }}
          ></TextField>
          <TextField
            variant="filled"
            label="Gentag password"
            value={tempRepeatedPassword}
            className={classes.dialogInput}
            error={error ? true : false}
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
          HandleClose={Close}
          setUserAlert={setUserAlert}
        ></DeleteUserDialog>
        <Button onClick={Close}>Annuller</Button>
        <Button onClick={CloseAndSave}>Gem</Button>
      </DialogActions>
    </Dialog>
  );
};
