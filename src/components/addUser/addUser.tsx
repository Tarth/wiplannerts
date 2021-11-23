import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { AddUserProp, AlertProp } from "../../models/models";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { FormUser } from "../utilityComponents/formUser";
import { alertStyle } from "../utilityComponents/userAlert.style";
import { ResetUserInputFields } from "../utilityComponents/resetinputfields";
import { PostUser, GetUsersAsState } from "../../utility/datahandler";

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
      GetUsersAsState(accessToken, setUsers);
      setModalAlert({
        type: "success",
        title: "Success",
        text: "Bruger tilføjet til databasen",
      });
      ResetUserInputFields(setWorkerName, setPassword, setUserGroup, setUserName);
    } catch (err) {
      setModalAlert({
        type: "error",
        title: "Fejl",
        text: `Fejltext: ${err}`,
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
            <FormUser
              userName={userName}
              setUserName={setUserName}
              setPassword={setPassword}
              userGroup={userGroup}
              setUserGroup={setUserGroup}
              workerName={workerName}
              setWorkerName={setWorkerName}
            ></FormUser>
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
