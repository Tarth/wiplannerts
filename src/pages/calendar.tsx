import React, { useEffect, useState } from "react";
import { getDataWithValidToken } from "../utility/datahandler";
import { NameBackgroundColor } from "../utility/colorcodes";
import { Job_Worker, DateProp, CalendarDataProps, IsUserLoggedInProp } from "../models/models";
import {
  addDays,
  subDays,
  startOfWeek,
  format,
  differenceInCalendarDays,
  getISOWeek,
  isFriday,
} from "date-fns";
import { da } from "date-fns/locale";
import { IconButton } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import { Navigation } from "../components/navigation/navigation";
import { calendarStyles } from "./calendar.style";

export const Calendar: React.FC<IsUserLoggedInProp> = ({
  isLoggedIn,
  setIsLoggedIn,
  userGroup,
}) => {
  const [tasks, setTasks] = useState<Job_Worker[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2021, 11, 21));
  const fetchTimer = 60_000;
  const { workerContainer, leftRightBtngrp } = calendarStyles();

  useEffect(() => {
    const abortController = new AbortController();
    let getDataTimer = setInterval(() => {}, fetchTimer);
    void (async function fetchData() {
      try {
        await getDataWithValidToken({ setIsLoggedIn, setTasks });
        // getDataTimer = setInterval(async () => {
        //   await getDataWithValidToken({ setIsLoggedIn, setTasks });
        // }, fetchTimer);
      } catch (error) {
        return;
      }
    })();
    return () => {
      abortController.abort();
      // clearInterval(getDataTimer);
    };
  }, []);

  return (
    <>
      <Navigation
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userGroup={userGroup}
      ></Navigation>

      <DisplayHeaders currentDate={currentDate} />
      {/* <div className="leftrightbtngrp"> */}
      <div className={leftRightBtngrp}>
        <IconButton onClick={() => setCurrentDate(subDays(currentDate, 7))} color="primary">
          <ArrowBack></ArrowBack>
        </IconButton>
        <IconButton onClick={() => setCurrentDate(addDays(currentDate, 7))} color="primary">
          <ArrowForward></ArrowForward>
        </IconButton>
      </div>

      <div className={workerContainer}>
        <DisplayWeekDays currentDate={currentDate} />
        <AllWorkers tasks={tasks} currentDate={currentDate} />
      </div>
    </>
  );
};

const DisplayHeaders: React.FC<DateProp> = ({ currentDate }) => {
  const initialDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const { headerMonthAndYear, headerMonth, headerYear } = calendarStyles();
  return (
    <>
      <div className={headerMonthAndYear}>
        <div className={headerMonth}>{format(initialDate, "MMMM", { locale: da })}</div>
        <div>Uge {getISOWeek(initialDate)}</div>
        <div className={headerYear}>{format(initialDate, "yyyy", { locale: da })}</div>
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
  const { headerDate, headersDate } = calendarStyles();
  for (let i = 0; i < numberOfDays; i++) {
    daysOfTheWeek.push(addDays(firstDayOfWeek, i));
  }
  return (
    <div className={headersDate}>
      {daysOfTheWeek.map((x) => (
        <div key={daysOfTheWeek.indexOf(x)} className={headerDate}>
          {format(x, "EEEE dd/LL", { locale: da })}
        </div>
      ))}
    </div>
  );
};

const AllWorkers: React.FC<CalendarDataProps> = ({ tasks, currentDate }) => {
  let allNamesFromDB: String[] = [];
  let sortedByWorker: Job_Worker[][] = [];
  let tempMultiDay: Job_Worker[] = [];

  // this make sure that tasks that last multiple days, are displayed correctly in the frontend
  tasks.forEach((task) => {
    const deltaDays = differenceInCalendarDays(task.end, task.start);
    if (deltaDays !== 0) {
      for (let i = 0; i <= deltaDays; i++) {
        tempMultiDay.push({
          description: task.description,
          worker: task.worker,
          start: addDays(task.start, i),
          deltaDays: deltaDays,
          end: task.end,
          id: task.id,
        });
      }
    } else {
      tempMultiDay.push(Object.assign(task, { deltaDays: deltaDays }));
    }
  });
  // Find unique workers
  allNamesFromDB = tempMultiDay.map((x) => x.worker.name);
  let uniqWorkers = allNamesFromDB.filter((name, index) => {
    return allNamesFromDB.indexOf(name) === index;
  });

  // Sort job data by worker
  for (let i = 0; i < uniqWorkers.length; i++) {
    sortedByWorker.push(tempMultiDay.filter((x) => x.worker.name === uniqWorkers[i]));
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
        <div key={sortedByWorker.indexOf(x)} className="worker">
          <WeeklyTasks tasks={x} index={i} currentDate={currentDate} />
        </div>
      ))}
    </>
  );
};

//Display all tasks of 1 worker during a week
const WeeklyTasks: React.FC<CalendarDataProps> = ({ tasks, index, currentDate }) => {
  const numberOfDays: number = 5;
  const oneWorkerWeekData: Job_Worker[][] = [];
  const firstDayOfWeek = startOfWeek(currentDate as Date, {
    weekStartsOn: 1,
  });
  const { workerWeek } = calendarStyles();

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

  oneWorkerWeekData.forEach((array) => {
    if (array.length > 0) {
      array.sort((a, b) => {
        if (a.start > b.start) return 1;
        if (a.start < b.start) return -1;
        return 0;
      });
    }
  });

  return (
    <>
      <DisplayWorkerName tasks={tasks} />
      <div className={workerWeek}>
        {oneWorkerWeekData.map((x) => {
          return <DailyTasks key={oneWorkerWeekData.indexOf(x)} tasks={x} index={index} />;
        })}
      </div>
    </>
  );
};

// Display all tasks during a day
const DailyTasks: React.FC<CalendarDataProps> = ({ tasks, index }) => {
  let borderColorLeft = "#000000";
  let borderColorRight = NameBackgroundColor(index);
  let tasksInADay: JSX.Element[];
  const { workerJobs, workerJob } = calendarStyles();

  if (tasks.length !== 0) {
    const lastJobOfDay = tasks[tasks.length - 1];
    //const firstJobOfDay = tasks[0];
    const isJobOnFriday = isFriday(lastJobOfDay.start);
    console.log(tasks);
    // if (isJobOnFriday && lastJobOfDay === ) {
    //   border
    // }

    tasksInADay = tasks.map((x) => {
      var color = borderColorRight;
      if (isJobOnFriday && lastJobOfDay === x) {
        color = "#000000";
      }

      return (
        <div
          key={x.id}
          className={workerJob}
          style={{
            backgroundColor: NameBackgroundColor(index),
            borderLeft: `1px solid ${borderColorLeft}`,
            borderRight: `1px solid ${color}`,
          }}
        >
          <div>{`${x.description} - ${x.deltaDays}`}</div>
          <div>
            {format(x.start, "HH:mm")} - {format(x.end, "HH:mm")}
          </div>
        </div>
      );
    });
  } else {
    tasksInADay = [
      <div
        className={workerJob}
        style={{
          backgroundColor: "white",
          borderLeft: `1px solid black`,
        }}
      ></div>,
    ];
  }

  return (
    <>
      <div className={workerJobs} style={{ borderTop: "1px solid black" }}>
        {tasksInADay}
      </div>
    </>
  );
};

const DisplayWorkerName: React.FC<CalendarDataProps> = ({ tasks }) => {
  const { workerName } = calendarStyles();
  const nameToDisplay = [];
  if (tasks.length !== 0) {
    nameToDisplay.push(tasks[0].worker.name);
  }
  return <div className={workerName}>{nameToDisplay}</div>;
};
