import React from "react";
import { useStyles } from "./formJob.style";
import { JobFormAddProp } from "../../models/models";
import { FormControl } from "@material-ui/core";
import { DateInput } from "./calendarInput";
import { Description } from "./descriptionInput";
import { CheckboxList } from "./workerListBox";

export const FormJob: React.FC<JobFormAddProp> = ({
  description,
  setDescription,
  endDate,
  isEndValid,
  isStartValid,
  selectedWorkers,
  setEndDate,
  setIsEndValid,
  setIsStartValid,
  setSelectedWorkers,
  setStartDate,
  startDate,
  workers,
}) => {
  const classes = useStyles();

  return (
    <>
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
    </>
  );
};
