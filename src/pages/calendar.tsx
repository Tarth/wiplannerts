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
import { ArrowForward, ArrowBack, ArrowRight, ArrowLeft } from "@material-ui/icons";
import { Navigation } from "../components/navigation/navigation";
import { calendarStyles } from "./calendar.style";
import { border, borderRadius } from "@material-ui/system";

export const Calendar: React.FC<IsUserLoggedInProp> = ({
  isLoggedIn,
  setIsLoggedIn,
  userGroup,
}) => {
  const [tasks, setTasks] = useState<Job_Worker[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2021, 11, 21)); //DEBUG: Dont forget to remove the specific date before prod
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
  const { worker } = calendarStyles();
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
  let uniqWorkers = RemoveDuplicateWorkerNames();
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
  console.log(sortedByWorker);
  return (
    <>
      {sortedByWorker.map((x, i) => {
        return (
          <div key={sortedByWorker.indexOf(x)} className={worker}>
            <WeeklyTasks tasks={x} index={i} currentDate={currentDate} />
          </div>
        );
      })}
    </>
  );

  function RemoveDuplicateWorkerNames() {
    allNamesFromDB = tempMultiDay.map((x) => x.worker.name);
    let uniqWorkers = allNamesFromDB.filter((name, index) => {
      return allNamesFromDB.indexOf(name) === index;
    });
    return uniqWorkers;
  }
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
  console.log(oneWorkerWeekData);

  return (
    <>
      <DisplayWorkerName tasks={tasks} />
      <div className={workerWeek}>
        {oneWorkerWeekData.map((x, i, oneWorkerWeekData) => {
          return (
            <DailyTasks
              key={oneWorkerWeekData.indexOf(x)}
              tasks={x}
              index={index}
              weekDataIndex={i}
            />
          );
        })}
      </div>
    </>
  );
};

//Display all tasks during a day
// const DailyTasksRefactor: React.FC<CalendarDataProps> = ({ tasks, index, weekDataIndex }) => {
//   let borderColorLeft = "#000000";
//   let borderColorRight = NameBackgroundColor(index);
//   const { workerJobs, workerJobEmpty } = calendarStyles();

//   if (tasks.length === 0) {
//     let border = "none";
//     if (weekDataIndex === 4) {
//       border = "1px solid black";
//     }
//     return (
//       <>
//         <div className={workerJobs}>
//           <div className={workerJobEmpty} style={{ borderRight: border }}></div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className={workerJobs}>
//         {TasksInADay(tasks, borderColorLeft, borderColorRight, weekDataIndex, index)}
//       </div>
//     </>
//   );
// };
// Display all tasks during a day
const DailyTasks: React.FC<CalendarDataProps> = ({ tasks, index, weekDataIndex }) => {
  let borderColorLeft = "#000000";
  let borderColorRight = NameBackgroundColor(index);
  let tasksInADay: JSX.Element[];
  const { workerJobs, workerJob, workerJobEmpty, taskDescription, taskTime, taskIcon } =
    calendarStyles();

  if (tasks.length === 0) {
    let borderRight = "none";
    if (weekDataIndex === 4) {
      borderRight = "1px solid black";
    }
    return (
      <>
        <div className={workerJobs}>
          <div className={workerJobEmpty} style={{ borderRight: borderRight }}></div>
        </div>
      </>
    );
  }

  tasksInADay = tasks.map((x, i, tasks) => {
    borderColorLeft = "#000000";
    const lastJobOfDay = tasks[tasks.length - 1];
    const isJobOnFriday = isFriday(lastJobOfDay.start);

    let taskDiv = (
      <>
        {TaskLayout(
          "first",
          false,
          x.description,
          x.start,
          x.end,
          taskDescription,
          taskTime,
          taskIcon
        )}
      </>
    );
    if (x.deltaDays !== undefined) {
      if (
        x.deltaDays > 0 &&
        differenceInCalendarDays(subDays(x.end, x.deltaDays), x.start) !== 0 &&
        weekDataIndex !== 0
      ) {
        borderColorLeft = NameBackgroundColor(index);
        taskDiv = (
          <>
            {TaskLayout(
              "first",
              true,
              x.description,
              x.start,
              x.end,
              taskDescription,
              taskTime,
              taskIcon
            )}
          </>
        );
      }
    }

    if (isJobOnFriday && lastJobOfDay === x && differenceInCalendarDays(x.start, x.end) === 0) {
      borderColorRight = "#000000";
    }

    return (
      <div
        key={x.id}
        className={workerJob}
        style={{
          backgroundColor: NameBackgroundColor(index),
          borderLeft: `1px solid ${borderColorLeft}`,
          borderRight: `1px solid ${borderColorRight}`,
          borderRadius: `${borderRadius}`,
        }}
      >
        {taskDiv}
      </div>
    );
  });

  return (
    <>
      <div className={workerJobs}>{tasksInADay}</div>
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

function EmptyDay(weekDataIndex: number | undefined) {
  const { workerJobs, workerJobEmpty } = calendarStyles();
  let borderRight = "none";
  if (weekDataIndex === 4) {
    borderRight = "1px solid black";
  }
  return (
    <>
      <div className={workerJobs}>
        <div className={workerJobEmpty} style={{ borderRight: borderRight }}></div>
      </div>
    </>
  );
}

function SortWorkerDataByStartDate(oneWorkerWeekData: Job_Worker[][]) {}

function GetOneWorkerWeekData(
  numberOfDays: number,
  oneWorkerWeekData: Job_Worker[][],
  tasks: Job_Worker[],
  firstDayOfWeek: Date
) {}

// function TasksInADay(
//   tasks: Job_Worker[],
//   borderColorLeft: string,
//   borderColorRight: string,
//   weekDataIndex: number | undefined,
//   index: number | undefined
// ) {
//   const { workerJob } = calendarStyles();
//   const tasksInADay = tasks.map((x, i, tasks) => {
//     borderColorLeft = "#000000";
//     const lastJobOfDay = tasks[tasks.length - 1];
//     const isJobOnFriday = isFriday(lastJobOfDay.start);
//     if (x.deltaDays !== undefined) {
//       if (x.deltaDays > 0) {
//         if (
//           weekDataIndex === 0 &&
//           differenceInCalendarDays(subDays(x.end, x.deltaDays), x.start) < 0
//         ) {
//           borderColorLeft = NameBackgroundColor(index);
//         }
//       }
//     }
//     let taskDiv = <>{TaskLayout("first", true, x.description, x.start, x.end)}</>;
//     BGColorBorderLeftIfMultiDay(x, weekDataIndex, index);
//     BlackBorderRightIfLastOnFriday(x, isJobOnFriday, lastJobOfDay, borderColorRight);
//     return (
//       <div
//         key={x.id}
//         className={workerJob}
//         style={{
//           backgroundColor: NameBackgroundColor(index),
//           borderLeft: `1px solid ${borderColorLeft}`,
//           borderRight: `1px solid ${borderColorRight}`,
//         }}
//       >
//         {taskDiv}
//       </div>
//     );
//   });
//   return tasksInADay;
// }

function TaskLayout(
  iconPosition: "first" | "last",
  hidden: boolean,
  description: string,
  start: Date,
  end: Date,
  taskDescription: string,
  taskTime: string,
  taskIcon: string
) {
  let divReturn = <></>;
  if (hidden) {
    return divReturn;
  }
  if (iconPosition === "first") {
    divReturn = IconFirstOrLast(
      "first",
      description,
      start,
      end,
      taskDescription,
      taskTime,
      taskIcon
    );
  } else {
    divReturn = IconFirstOrLast(
      "last",
      description,
      start,
      end,
      taskDescription,
      taskTime,
      taskIcon
    );
  }
  return <>{divReturn}</>;
}

function IconFirstOrLast(
  iconPosition: "first" | "last",
  description: string,
  start: Date,
  end: Date,
  taskDescription: string,
  taskTime: string,
  taskIcon: string
) {
  let icon = <></>;
  const task = (
    <>
      <div className={taskDescription}>{`${description}`}</div>
      <div className={taskTime}>
        {format(start, "HH:mm")} - {format(end, "HH:mm")}
      </div>
    </>
  );
  if (iconPosition === "first") {
    icon = (
      <div className={taskIcon}>
        <ArrowLeft></ArrowLeft>
      </div>
    );
    return (
      <>
        {icon}
        {task}
      </>
    );
  } else {
    icon = (
      <div className={taskIcon}>
        <ArrowRight></ArrowRight>
      </div>
    );
    return (
      <>
        {task}
        {icon}
      </>
    );
  }
}
// function BGColorBorderLeftIfMultiDay(
//   job: Job_Worker,
//   weekDataIndex: number | undefined,
//   index: number | undefined
// ) {
//   const { deltaDays, end, start } = job;
//   if (deltaDays !== undefined && weekDataIndex !== undefined && index !== undefined) {
//     if (
//       deltaDays > 0 &&
//       differenceInCalendarDays(subDays(end, deltaDays), start) !== 0 &&
//       weekDataIndex !== 0
//     ) {
//       return NameBackgroundColor(index);
//     }
//   }
// }

// function BlackBorderRightIfLastOnFriday(
//   job: Job_Worker,
//   isJobOnFriday: boolean,
//   lastJobOfDay: Job_Worker,
//   borderColorRight: string
// ) {
//   if (isJobOnFriday && lastJobOfDay === job && differenceInCalendarDays(job.start, job.end) === 0) {
//     borderColorRight = "#000000";
//   }
// }
