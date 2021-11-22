import React from "react";
import { TextField, FormControl, InputLabel } from "@material-ui/core";
import { UserSelectBox } from "./elements/userSelectBox";
import { useStyles } from "../../components/addUser/style";
import { FormUserProp } from "../../models/models";

const FormUser: React.FC<FormUserProp> = ({
  userName,
  setUserName,
  setPassword,
  userGroup,
  setUserGroup,
  workerName,
  setWorkerName,
}) => {
  const { form, formElement, inputLabel } = useStyles();

  return (
    <form className={form}>
      <FormControl className={formElement}>
        <InputLabel id="inputUserClassSelect" className={inputLabel}>
          Brugerklasse
        </InputLabel>
        <UserSelectBox
          setUserGroup={setUserGroup}
          workerName={workerName}
          setWorkerName={setWorkerName}
          userGroup={userGroup}
        ></UserSelectBox>
      </FormControl>
      <FormControl className={formElement}>
        <TextField
          variant="filled"
          label="Kalendernavn"
          disabled={userGroup !== "worker" ? true : false}
          onChange={(e) => {
            setWorkerName(e.target.value);
          }}
        ></TextField>
      </FormControl>
      <FormControl className={formElement}>
        <TextField
          variant="filled"
          label="Brugernavn"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></TextField>
      </FormControl>
      <FormControl className={formElement}>
        <TextField
          variant="filled"
          type="password"
          label="Kodeord"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></TextField>
      </FormControl>
    </form>
  );
};

export { FormUser };
