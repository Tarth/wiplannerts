import React from "react";
import { TextField, FormControl, InputLabel } from "@material-ui/core";
import { UserSelectBox } from "./elements/userSelectBox";
import { userStyles } from "./form.style";
import { FormUserProp } from "../../models/models";

const FormUser: React.FC<FormUserProp> = ({
  userName,
  setUserName,
  setPassword,
  userGroup,
  setUserGroup,
  workerName,
  setWorkerName,
  setTempPassword,
  setRepeatedTempPassWord,
}) => {
  const { formElement, inputLabel } = userStyles();

  return (
    <>
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
        <InputLabel id="inputUserClassSelect" className={inputLabel}>
          Brugergruppe
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
          value={workerName}
          disabled={userGroup !== "worker" ? true : false}
          onChange={(e) => {
            setWorkerName(e.target.value);
          }}
        ></TextField>
      </FormControl>
    </>
  );
};

export { FormUser };
