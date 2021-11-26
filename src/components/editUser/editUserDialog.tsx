import React, { useState } from "react";
import { useStylesDialog } from "./style";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
} from "@material-ui/core";
import { EditUserDialogProp, AlertProp } from "../../models/models";
import { DeleteUserDialog } from "./confirmationDialog";
import { UpdateUser, GetUsersAsState } from "../../utility/datahandler";
import { UserSelectBox } from "../utilityComponents/elements/userSelectBox";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { FormUser } from "../utilityComponents/formUser";
import { ResetUserInputFields } from "../utilityComponents/resetinputfields";

export const EditUserDialog: React.FC<EditUserDialogProp> = ({
  openEditModal,
  setOpenEditModal,
  username,
  setUsername,
  password,
  setPassword,
  usergroup,
  setUsergroup,
  workerName,
  setWorkerName,
  userId,
  setUsers,
  setLoading,
  userAlert,
  setUserAlert,
  modalAlert,
  setModalAlert,
}) => {
  const classes = useStylesDialog();
  const [tempPassword, setTempPassword] = useState("");
  const [tempRepeatedPassword, setTempRepeatedPassword] = useState("");
  const [error, setError] = useState(false);

  const CloseAndSave = async () => {
    let _password = "";
    const accessToken = localStorage.getItem("accesstoken");
    if (
      username.length === 0 ||
      tempPassword !== tempRepeatedPassword ||
      (usergroup === "worker" && workerName.length === 0)
    ) {
      setModalAlert({
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
      await UpdateUser(username, usergroup, _password, accessToken as string, userId, workerName);
      if (error === true) {
        setError(false);
      }
      await GetUsersAsState(accessToken as string, setUsers);
      Close();
      setUserAlert({
        type: "success",
        title: "Succes",
        text: "Bruger redigeret",
      });
    } catch (error) {
      setModalAlert({
        type: "error",
        title: "Fejl",
        text: `${error}`,
      });
    }
  };

  const Close = () => {
    setOpenEditModal(false);
    ResetUserInputFields(setWorkerName, setPassword, setUsergroup, setUsername);
  };

  let alert = (
    <div className="alertDiv">
      <UserAlertHandler
        type={modalAlert.type}
        title={modalAlert.title}
        text={modalAlert.text}
      ></UserAlertHandler>
    </div>
  );

  return (
    <Dialog open={openEditModal} onClose={Close} className={classes.container}>
      <DialogTitle>Rediger/slet</DialogTitle>
      <DialogContent>
        {alert}
        <FormUser
          userName={username}
          setUserName={setUsername}
          setPassword={setPassword}
          userGroup={usergroup}
          setUserGroup={setUsergroup}
          workerName={workerName}
          setWorkerName={setWorkerName}
          setTempPassword={setTempPassword}
          setRepeatedTempPassWord={setTempRepeatedPassword}
        ></FormUser>
        <FormControl>
          <TextField
            variant="filled"
            type="password"
            label="Gentag password"
            value={tempRepeatedPassword}
            className={classes.dialogInput}
            error={error ? true : false}
            onChange={(e) => {
              setTempRepeatedPassword(e.target.value);
            }}
          ></TextField>
        </FormControl>
        {/* <div className={classes.userInputWrapper}>
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
          ></TextField> */}
        {/* </div> */}
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
        <ButtonWrapper
          onClick={() => {
            if (password !== "" && password !== tempRepeatedPassword) {
              console.log(password);
              console.log(tempRepeatedPassword);
              console.log("Passwordet er ikke tomt, og ikke ens");
            }
          }}
          caption="TEST"
          variant="text"
          color="primary"
        ></ButtonWrapper>
      </DialogActions>
    </Dialog>
  );
};
