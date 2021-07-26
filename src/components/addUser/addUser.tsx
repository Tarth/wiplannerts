import React, { useState, useEffect } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { UserAlertProp } from "../../models/models";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { useStyles } from "./style";

export const AddUser: React.FC<UserAlertProp> = ({ usrAlert, setUsrAlert }) => {
  const [userLevel, setUserLevel] = useState("");
  const [userClasses, setUserClasses] = useState<String[]>([]);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserLevel(event.target.value as string);
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
          <TextField variant="filled" label="Brugernavn"></TextField>
        </FormControl>
        <FormControl className={classes.formElement}>
          <TextField
            variant="filled"
            type="password"
            label="Kodeord"
          ></TextField>
        </FormControl>
        <FormControl className={classes.formElement}>
          <InputLabel id="inputUserClassSelect" className={classes.inputLabel}>
            Brugerklasse
          </InputLabel>
          <Select
            variant="filled"
            labelId="inputUserClassSelect"
            value={userLevel}
            onChange={handleChange}
          >
            <MenuItem value={10}>Admin</MenuItem>
            <MenuItem value={20}>Planner</MenuItem>
            <MenuItem value={30}>Medarbejder</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formElement}>
          <TextField variant="filled" label="Kalendernavn"></TextField>
        </FormControl>
        <Button color="primary" variant="outlined">
          Tilføj
        </Button>
      </form>
    </div>
  );
};
