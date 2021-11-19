import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { AddUserProp, AlertProp } from "../../models/models";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { ButtonWrapper } from "../utilityComponents/elements/buttonWrapper";
import { FormUser } from "../utilityComponents/formUser";
import { PostUser, GetUsersState } from "../../utility/datahandler";
import { alertStyle } from "../utilityComponents/userAlert.style";

export const AddUser: React.FC<AddUserProp> = ({ openAddModal, setOpenAddModal, setUsers }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userGroup, setUserGroup] = useState("worker");
  const [workerName, setWorkerName] = useState("");
  const [userAlert, setUserAlert] = useState<AlertProp>({
    type: "",
    title: "",
    text: "",
  });

  const { alertDiv } = alertStyle();

  let alert = (
    <div className="alertDiv">
      <UserAlertHandler
        type={userAlert.type}
        title={userAlert.title}
        text={userAlert.text}
      ></UserAlertHandler>
    </div>
  );

  const CloseModal = () => {
    setOpenAddModal(false);
    setUserAlert({
      type: "",
      title: "",
      text: "",
    });
  };

  const SubmitUser = async () => {
    if (userName === "" || password === "" || (userGroup === "worker" && workerName === "")) {
      setUserAlert({
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
      GetUsersState(accessToken, setUsers);
      setUserAlert({
        type: "success",
        title: "Success",
        text: "Bruger tilføjet til databasen",
      });
    } catch (err) {
      setUserAlert({
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
            {/* <form className={classes.form}>
              <FormControl className={classes.formElement}>
                <TextField
                  variant="filled"
                  label="Brugernavn"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                ></TextField>
              </FormControl>
              <FormControl className={classes.formElement}>
                <TextField
                  variant="filled"
                  type="password"
                  label="Kodeord"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></TextField>
              </FormControl>
              <FormControl className={classes.formElement}>
                <InputLabel id="inputUserClassSelect" className={classes.inputLabel}>
                  Brugerklasse
                </InputLabel>
                <UserSelectBox
                  setUserGroup={setUserGroup}
                  workerName={workerName}
                  setWorkerName={setWorkerName}
                  userGroup={userGroup}
                ></UserSelectBox>
              </FormControl>
              <FormControl className={classes.formElement}>
                <TextField
                  variant="filled"
                  label="Kalendernavn"
                  disabled={userGroup !== "worker" ? true : false}
                  onChange={(e) => {
                    setWorkerName(e.target.value);
                  }}
                ></TextField>
              </FormControl>
            </form> */}
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
