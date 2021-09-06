import React, { useState, useEffect } from "react";
import { TextField, InputLabel, FormControl, Button } from "@material-ui/core";
import { UserAlertProp } from "../../models/models";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { UserSelectBox } from "../utilityComponents/elements/userSelectBox";
import { useStyles } from "./style";
import { PostWorker } from "../../utility/datahandler";

export const AddUser: React.FC<UserAlertProp> = ({ usrAlert, setUsrAlert }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userGroup, setUserGroup] = useState("worker");
  const [workerName, setWorkerName] = useState("");
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserGroup(event.target.value as string);
    if (event.target.value !== "worker") {
      setWorkerName("");
    }
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

  useEffect(() => {
    const defaultInfoText =
      "Udfyld felterne nedenfor og brug derefter knappen i bunden til at tilføje en ny bruger til databasen.";
    if (usrAlert.text === "") {
      setUsrAlert({
        type: "info",
        title: "Information",
        text: defaultInfoText,
      });
    }
  }, [setUsrAlert, usrAlert]);

  return (
    <div>
      {alert}
      <form className={classes.form}>
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
        <Button
          color="primary"
          variant="outlined"
          onClick={async () => {
            if (
              userName === "" ||
              password === "" ||
              (userGroup === "worker" && workerName === "")
            ) {
              setUsrAlert({
                type: "error",
                title: "Fejl",
                text: "Forkert indtastning. Ingen af felterne må være tomme",
              });
              return;
            }
            try {
              if (userGroup === "worker") {
                await PostWorker(
                  userName,
                  userGroup,
                  password,
                  localStorage.getItem("accesstoken") as string,
                  workerName
                );
              } else {
                await PostWorker(
                  userName,
                  userGroup,
                  password,
                  localStorage.getItem("accesstoken") as string
                );
              }
              setUsrAlert({
                type: "success",
                title: "Success",
                text: "Bruger tilføjet til databasen",
              });
            } catch (err) {
              setUsrAlert({
                type: "error",
                title: "Fejl",
                text: `Fejltext: ${err}`,
              });
            }
          }}
        >
          Tilføj
        </Button>
      </form>
    </div>
  );
};
