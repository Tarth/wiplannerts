import React from "react";
import { useStyles } from "./formJob.style";
import { JobFormProp } from "../../../models/models";
import { FormControl } from "@material-ui/core";
export const formJob: React.FC<JobFormProp> = ({ description, setDescription }) => {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <div className={classes.leftContainer}>
        <Description description={description} setDescription={setDescription} />
        <FormControl>
          <DateInput
            date={startDate}
            setDate={setStartDate}
            isDateValid={isStartValid}
            setIsDateValid={setIsStartValid}
          />
        </FormControl>
        <FormControl>
          <DateInput
            date={endDate}
            setDate={setEndDate}
            isDateValid={isEndValid}
            setIsDateValid={setIsEndValid}
          />
        </FormControl>
      </div>
      <CheckboxList
        workers={workers}
        selectedWorkers={selectedWorkers}
        setSelectedWorkers={setSelectedWorkers}
      ></CheckboxList>
    </form>
  );
};
