import React, { useState } from "react";
import { useStylesDialog } from "./style";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { EditUserDialogProp, AlertProp } from "../../models/models";
import { UserSelectBox } from "../utilityComponents/elements/userSelectBox";
import { DeleteUserDialog } from "./confirmationDialog";
import { UpdateUser, GetUsersState } from "../../utility/datahandler";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";

export const EditUserDialog: React.FC<EditUserDialogProp> = ({
  openEditModal,
  setOpenEditModal,
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
  setLoading,
  userAlert,
  setUserAlert,
}) => {
  const classes = useStylesDialog();
  const [tempPassword, setTempPassword] = useState("");
  const [tempRepeatedPassword, setTempRepeatedPassword] = useState("");
  const [error, setError] = useState(false);
  // const [userAlert, setUserAlert] = useState<AlertProp>({
  //   type: "",
  //   title: "",
  //   text: "",
  // });

  const CloseAndSave = async () => {
    let _password = "";
    const accessToken = localStorage.getItem("accesstoken");
    if (
      username.length === 0 ||
      tempPassword !== tempRepeatedPassword ||
      (usergroup === "worker" && name.length === 0)
    ) {
      setUserAlert({
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
    try {
      await UpdateUser(username, usergroup, _password, accessToken as string, userId, name);
      if (error === true) {
        setError(false);
      }
    } catch (error) {
      setUserAlert({
        type: "error",
        title: "Fejl",
        text: `Fejl - ${error}`,
      });
    }
    try {
      await GetUsersState(accessToken as string, setUsers);
      Close();
    } catch (error) {
      console.log(error);
    }
  };

  const Close = () => {
    setOpenEditModal(false);
  };

  let alert = (
    <div className="alertDiv">
      <UserAlertHandler
        type={userAlert.type}
        title={userAlert.title}
        text={userAlert.text}
      ></UserAlertHandler>
    </div>
  );

  return (
    <Dialog open={openEditModal} onClose={Close} className={classes.container}>
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
        <ButtonWrapper
          onClick={Close}
          caption="Annuller"
          variant="text"
          color="default"
        ></ButtonWrapper>
        <ButtonWrapper
          onClick={CloseAndSave}
          caption="Gem"
          variant="text"
          color="primary"
        ></ButtonWrapper>
      </DialogActions>
    </Dialog>
  );
};
