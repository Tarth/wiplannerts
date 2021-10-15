import React, { useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { UserSelectBoxProp } from "../../../models/models";

export const UserSelectBox: React.FC<UserSelectBoxProp> = ({
  setUserGroup,
  userGroup,
  workerName,
  setWorkerName,
}) => {
  const [temp] = useState(workerName);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserGroup(event.target.value as string);
    if (event.target.value !== "worker") {
      setWorkerName("");
    } else {
      setWorkerName(temp);
    }
  };

  return (
    <Select
      variant="filled"
      labelId="inputUserClassSelect"
      value={userGroup}
      onChange={handleChange}
    >
      <MenuItem value={"worker"}>Worker</MenuItem>
      <MenuItem value={"planner"}>Planner</MenuItem>
      <MenuItem value={"winotoadmin"}>Winotoadmin</MenuItem>
    </Select>
  );
};
