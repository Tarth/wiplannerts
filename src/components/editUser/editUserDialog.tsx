import React, { useState } from "react";
import { formStyles, userStyles } from "../utilityComponents/form.style";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
} from "@material-ui/core";
import { EditUserDialogProp } from "../../models/models";
import { DeleteUserDialog } from "./confirmationDialog";
import { UpdateUser, GetUsersAsState } from "../../utility/datahandler";
import { CheckToken } from "../../utility/auth";
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
  const { dialogInput } = formStyles();
  const { form } = userStyles();
  const [tempPassword, setTempPassword] = useState("");
  const [tempRepeatedPassword, setTempRepeatedPassword] = useState("");
  const [error, setError] = useState(false);

  const CloseAndSave = async () => {
    let _password = "";
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
      const accessToken = await CheckToken();
      if (typeof accessToken !== "string") return accessToken;
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
    <Dialog open={openEditModal} onClose={Close}>
      <DialogTitle>Rediger/slet</DialogTitle>
      <DialogContent>
        {alert}
        <form className={form}>
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
              autoComplete="off"
              variant="filled"
              type="password"
              label="Password"
              value={tempPassword}
              className={dialogInput}
              error={error ? true : false}
              onChange={(e) => {
                setTempPassword(e.target.value);
              }}
              //hack to prevent Chromium based browsers to autofill the password input
              InputProps={{
                autoComplete: "new-password",
              }}
            ></TextField>
          </FormControl>
          <FormControl>
            <TextField
              autoComplete="off"
              variant="filled"
              type="password"
              label="Gentag password"
              value={tempRepeatedPassword}
              className={dialogInput}
              error={error ? true : false}
              onChange={(e) => {
                setTempRepeatedPassword(e.target.value);
              }}
              InputProps={{
                autoComplete: "new-password",
              }}
            ></TextField>
          </FormControl>
        </form>
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
