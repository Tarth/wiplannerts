import React, { useEffect, useState } from "react";
// import "./css/index.css";
import { GetJobs } from "../utility/datahandler";
import { Job, DateProp, CalendarDataProps } from "../models/models";
import {
  addDays,
  subDays,
  startOfWeek,
  format,
  differenceInCalendarDays,
} from "date-fns";
import { da } from "date-fns/locale";
import { IconButton } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import { NameBackgroundColor } from "../utility/colorcodes";

export const Calendar: React.FC = () => {
  const [tasks, setTasks] = useState<Job[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2021, 4, 20));

  // fetch the data from the db every minute
  useEffect(() => {
    GetJobs(setTasks);
    // const interval = setInterval(() => {
    //   GetJobs(setTasks);
    // }, 60000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DisplayHeaders currentDate={currentDate} />
      <div className="leftrightbtngrp">
        <IconButton
          onClick={() => setCurrentDate(subDays(currentDate, 7))}
          color="primary"
        >
          <ArrowBack></ArrowBack>
        </IconButton>
        <IconButton
          onClick={() => setCurrentDate(addDays(currentDate, 7))}
          color="primary"
        >
          <ArrowForward></ArrowForward>
        </IconButton>
      </div>

      <div className="workercontainer">
        <DisplayWeekDays currentDate={currentDate} />
        <AllWorkers tasks={tasks} currentDate={currentDate} />
      </div>
    </>
  );
};

const DisplayHeaders: React.FC<DateProp> = ({ currentDate }) => {
  const initialDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  return (
    <>
      <div className="headermonthandyear">
        <div className="headermonth">
          {format(initialDate, "MMMM", { locale: da })}
        </div>
        <div className="headerweek">Uge {format(initialDate, "ww")}</div>
        <div className="headeryear">
          {format(initialDate, "yyyy", { locale: da })}
        </div>
      </div>
    </>
  );
};
// Display the headers of the weekdays in the calendar ie Mon, tue etc with dates
const DisplayWeekDays: React.FC<DateProp> = ({ currentDate }) => {
  const firstDayOfWeek = startOfWeek(currentDate, {
    weekStartsOn: 1,
  });
  const numberOfDays = 5;
  let daysOfTheWeek: Date[] = [];

  for (let i = 0; i < numberOfDays; i++) {
    daysOfTheWeek.push(addDays(firstDayOfWeek, i));
  }
  return (
    <div className="headersdate">
      {daysOfTheWeek.map((x) => (
        <div className="headerdate">
          {format(x, "EEEE dd/LL", { locale: da })}
        </div>
      ))}
    </div>
  );
};

const AllWorkers: React.FC<CalendarDataProps> = ({ tasks, currentDate }) => {
  let allNamesFromDB: String[] = [];
  let sortedByWorker = [];
  let tempMultiDay: Job[] = [];

  // this make sure that tasks that last multiple days, are displayed correctly in the frontend
  tasks.forEach((task, index) => {
    const deltaDays = differenceInCalendarDays(task.end, task.start);
    if (deltaDays !== 0) {
      for (let i = 0; i <= deltaDays; i++) {
        tempMultiDay.push({
          description: task.description,
          worker: task.worker,
          start: addDays(task.start, i),
          end: task.end,
          id: task.id,
        });
      }
    } else {
      tempMultiDay.push(task);
    }
  });

  // Find unique workers
  allNamesFromDB = tempMultiDay.map((x) => x.worker.name);
  let uniqWorkers = allNamesFromDB.filter((name, index) => {
    return allNamesFromDB.indexOf(name) === index;
  });

  // Sort job data by worker
  for (let i = 0; i < uniqWorkers.length; i++) {
    sortedByWorker.push(
      tempMultiDay.filter((x) => x.worker.name === uniqWorkers[i])
    );
    // sort worker list alphabetically
    sortedByWorker.sort(function (a, b) {
      if (a[0].worker.name > b[0].worker.name) return 1;
      if (a[0].worker.name < b[0].worker.name) return -1;
      return 0;
    });
  }

  return (
    <>
      {sortedByWorker.map((x, i) => (
        <div className="worker">
          <WeeklyTasks tasks={x} index={i} currentDate={currentDate} />
        </div>
      ))}
    </>
  );
};

//Display all tasks of 1 worker during a week
const WeeklyTasks: React.FC<CalendarDataProps> = ({
  tasks,
  index,
  currentDate,
}) => {
  const numberOfDays: Number = 5;
  const oneWorkerWeekData = [];
  const firstDayOfWeek = startOfWeek(currentDate as Date, {
    weekStartsOn: 1,
  });

  for (let i = 0; i < numberOfDays; i++) {
    oneWorkerWeekData.push(
      tasks.filter(
        (x) =>
          x.start.getDate() === addDays(firstDayOfWeek, i).getDate() &&
          x.start.getMonth() === addDays(firstDayOfWeek, i).getMonth() &&
          x.start.getFullYear() === addDays(firstDayOfWeek, i).getFullYear()
      )
    );
  }

  return (
    <>
      <DisplayWorkerName tasks={tasks} />
      <div className="workerweek">
        {oneWorkerWeekData.map((x) => (
          <DailyTasks tasks={x} index={index} />
        ))}
      </div>
    </>
  );
};

// Display all tasks during a day
const DailyTasks: React.FC<CalendarDataProps> = ({ tasks, index }) => {
  return (
    <>
      <div className="workerjobs" style={{ minHeight: "44px" }}>
        {tasks.map((x) => (
          <div
            className="workerjob"
            style={{ backgroundColor: NameBackgroundColor(index) }}
          >
            <div>{x.description}</div>
            <div>
              {format(x.start, "HH:mm")} - {format(x.end, "HH:mm")}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const DisplayWorkerName: React.FC<CalendarDataProps> = ({ tasks }) => {
  const nameToDisplay = [];
  if (tasks.length !== 0) {
    nameToDisplay.push(tasks[0].worker.name);
  }
  return <div className="workername">{nameToDisplay}</div>;
};
