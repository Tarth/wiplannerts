import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@material-ui/core";
import { AddUserProp } from "../../models/models";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { FormUser } from "../utilityComponents/formUser";
import { ResetUserInputFields } from "../utilityComponents/resetinputfields";
import { PostUser, GetUsersAsState } from "../../utility/datahandler";
import { alertStyle } from "../utilityComponents/userAlert.style";
import { formStyles, userStyles } from "../utilityComponents/form.style";

export const AddUser: React.FC<AddUserProp> = ({
  openAddModal,
  setOpenAddModal,
  setUsers,
  modalAlert,
  setModalAlert,
  userAlert,
  setUserAlert,
  userName,
  setUserName,
  password,
  setPassword,
  workerName,
  setWorkerName,
  userGroup,
  setUserGroup,
}) => {
  const { alertDiv } = alertStyle();
  const { dialogInput } = formStyles();
  const { form } = userStyles();
  let alert = (
    <div className={alertDiv}>
      <UserAlertHandler
        type={modalAlert.type}
        title={modalAlert.title}
        text={modalAlert.text}
      ></UserAlertHandler>
    </div>
  );

  const CloseModal = () => {
    setOpenAddModal(false);
    setModalAlert({
      type: "",
      title: "",
      text: "",
    });
    ResetUserInputFields(setWorkerName, setPassword, setUserGroup, setUserName);
  };

  const SubmitUser = async () => {
    if (userName === "" || password === "" || (userGroup === "worker" && workerName === "")) {
      setModalAlert({
        type: "error",
        title: "Fejl",
        text: "Forkert indtastning. Ingen tomme felter.",
      });
      return;
    }
    try {
      const accessToken = localStorage.getItem("accesstoken") as string;
      if (userGroup === "worker") {
        await PostUser(userName, userGroup, password, accessToken, workerName);
      } else {
        await PostUser(userName, userGroup, password, accessToken);
      }
      setModalAlert({
        type: "success",
        title: "Success",
        text: "Bruger tilføjet til databasen",
      });
      GetUsersAsState(accessToken, setUsers);
      ResetUserInputFields(setWorkerName, setPassword, setUserGroup, setUserName);
    } catch (err) {
      setModalAlert({
        type: "error",
        title: "Fejl",
        text: `${err}`,
      });
    }
  };

  return (
    <>
      <Dialog open={openAddModal} onClose={CloseModal}>
        <DialogTitle>Tilføj bruger</DialogTitle>
        <DialogContent>
          <div>
            {alert}
            <form className={form}>
              <FormUser
                userName={userName}
                setUserName={setUserName}
                setPassword={setPassword}
                userGroup={userGroup}
                setUserGroup={setUserGroup}
                workerName={workerName}
                setWorkerName={setWorkerName}
              ></FormUser>
              <FormControl>
                <TextField
                  variant="filled"
                  label="Password"
                  value={password}
                  className={dialogInput}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></TextField>
              </FormControl>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <ButtonWrapper onClick={CloseModal} caption="Annuller" variant="text"></ButtonWrapper>
          <ButtonWrapper
            onClick={SubmitUser}
            caption="Tilføj"
            variant="text"
            color="primary"
          ></ButtonWrapper>
        </DialogActions>
      </Dialog>
    </>
  );
};
