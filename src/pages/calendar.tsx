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
  isEqual,
  isBefore,
  parse,
} from "date-fns";
import { da } from "date-fns/locale";
import { IconButton } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import { Navigation } from "../components/navigation/navigation";

export const Calendar: React.FC<IsUserLoggedInProp> = ({
  isLoggedIn,
  setIsLoggedIn,
  userGroup,
}) => {
  const [tasks, setTasks] = useState<Job_Worker[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const fetchTimer = 60_000;

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
      <div className="leftrightbtngrp">
        <IconButton onClick={() => setCurrentDate(subDays(currentDate, 7))} color="primary">
          <ArrowBack></ArrowBack>
        </IconButton>
        <IconButton onClick={() => setCurrentDate(addDays(currentDate, 7))} color="primary">
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
        <div className="headermonth">{format(initialDate, "MMMM", { locale: da })}</div>
        <div className="headerweek">Uge {getISOWeek(initialDate)}</div>
        <div className="headeryear">{format(initialDate, "yyyy", { locale: da })}</div>
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
        <div key={daysOfTheWeek.indexOf(x)} className="headerdate">
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

  // console.log(oneWorkerWeekData);
  return (
    <>
      <DisplayWorkerName tasks={tasks} />
      <div className="workerweek">
        {oneWorkerWeekData.map((x) => (
          <DailyTasks
            key={oneWorkerWeekData.indexOf(x)}
            tasks={x}
            index={index}
            currentDate={currentDate}
          />
        ))}
      </div>
    </>
  );
};


// const WeeklyTasks: React.FC<CalendarDataProps> = ({ tasks, index, currentDate }) => {
//   const numberOfDays: number = 5;
//   const oneWorkerWeekData: Job_Worker[][] = [];
//   const firstDayOfWeek = startOfWeek(currentDate as Date, {
//     weekStartsOn: 1,
//   });
//   for (let i = 0; i < numberOfDays; i++) {
//     oneWorkerWeekData.push(
//       tasks.filter(
//         (x) =>
//           x.start.getDate() === addDays(firstDayOfWeek, i).getDate() &&
//           x.start.getMonth() === addDays(firstDayOfWeek, i).getMonth() &&
//           x.start.getFullYear() === addDays(firstDayOfWeek, i).getFullYear()
//       )
//     );
//   }

//   oneWorkerWeekData.forEach((array) => {
//     if (array.length > 0) {
//       array.sort((a, b) => {
//         if (a.start > b.start) return 1;
//         if (a.start < b.start) return -1;
//         return 0;
//       });
//     }
//   });

//   // console.log(oneWorkerWeekData);
//   return (
//     <>
//       <DisplayWorkerName tasks={tasks} />
//       <div className="workerweek">
//         {oneWorkerWeekData.map((x) => (
//           <DailyTasks
//             key={oneWorkerWeekData.indexOf(x)}
//             tasks={x}
//             index={index}
//             currentDate={currentDate}
//           />
//         ))}
//       </div>
//     </>
//   );
// };

// Display all tasks during a day
const DailyTasks: React.FC<CalendarDataProps> = ({ tasks, index, currentDate }) => {
  const firstDayOfWeek = startOfWeek(currentDate as Date, {
    weekStartsOn: 1,
  });
  // console.log(tasks);

  let color = "#000000";
  if (tasks.length > 0) {
    const { start, end } = tasks[0];
    const date1 = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const date2 = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const deltaEndAndCurrentDate = differenceInCalendarDays(date2, firstDayOfWeek as Date);
    const deltaStartAndEndDate = differenceInCalendarDays(date2, date1);
    // console.log(`${tasks[0].description}: ${deltaStartAndEndDate}`);
    // console.log(
    //   `${
    //     tasks[0].description
    //   } - ${date1.getDate()} ${date2.getDate()} - deltaStartAndEnd: ${deltaStartAndEndDate} - deltaTotalDays: ${deltaEndAndCurrentDate}`
    // );

    //

    if (deltaStartAndEndDate < deltaEndAndCurrentDate) {
      // if (){

      // }
      // if (deltaStartAndEndDate < deltaEndAndCurrentDate && deltaStartAndEndDate > 0) {
      color = NameBackgroundColor(index);
    }
    // currentDate er dags dato, dvs den skifter: Tue Dec 21 2021 09:59:02 GMT+0100 (Centraleuropæisk normaltid)
  }
  return (
    <>
      <div className="workerjobs" style={{ borderLeft: `1px solid ${color}` }}>
        {tasks.map((x) => (
          <div
            key={x.id}
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
