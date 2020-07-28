import React, { useState } from "react";
import "./index.css";
import { DataHandler } from "./datahandler";
import { Job } from "./models";
import { addDays, startOfWeek, format } from "date-fns";
import { da } from "date-fns/locale";
import { NameBackgroundColor } from "./colorcodes";

interface Props {
  tasks: Job[];
  index?: number;
}

export const Calendar: React.FC = () => {
  const [tasks, setTasks] = useState<Job[]>([]);
  //Use this as a list of names
  if (tasks.length === 0) {
    const dataHandler = DataHandler();
    setTasks(dataHandler);
  }
  return (
    <>
      <DisplayHeaders />
      <div className="workercontainer">
        <DisplayWeekDays />
        <AllWorkers tasks={tasks} />
      </div>
    </>
  );
};

const DisplayHeaders: React.FC = () => {
  const initialDate = new Date(2020, 6, 27);
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

const DisplayWeekDays: React.FC = () => {
  const firstDayOfWeek = startOfWeek(new Date(2020, 6, 27), {
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

const AllWorkers: React.FC<Props> = ({ tasks }) => {
  let allNamesFromDB: String[] = [];
  let sortedByWorker = [];

  // Find unique workers
  allNamesFromDB = tasks.map((x) => x.username);
  let uniqWorkers = allNamesFromDB.filter((name, index) => {
    return allNamesFromDB.indexOf(name) === index;
  });

  // Sort job data by worker
  for (let i = 0; i < uniqWorkers.length; i++) {
    sortedByWorker.push(tasks.filter((x) => x.username === uniqWorkers[i]));
  }

  return (
    <>
      {sortedByWorker.map((x, i) => (
        <div className="worker">
          <WeeklyTasks tasks={x} index={i} />
        </div>
      ))}
    </>
  );
};

const WeeklyTasks: React.FC<Props> = ({ tasks, index }) => {
  const numberOfDays: Number = 5;
  const oneWorkerWeekData = [];

  const firstDayOfWeek = startOfWeek(new Date(2020, 6, 27), {
    weekStartsOn: 1,
  });

  for (let i = 0; i < numberOfDays; i++) {
    oneWorkerWeekData.push(
      tasks.filter(
        (x) => x.start.getDate() === addDays(firstDayOfWeek, i).getDate()
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

const DailyTasks: React.FC<Props> = ({ tasks, index }) => {
  const color = NameBackgroundColor(index);
  return (
    <>
      <div className="workerjobs">
        {tasks.map((x) => (
          <div className="workerjob" style={{ backgroundColor: color }}>
            {x.start.getDate()}/{x.start.getMonth()}/{x.start.getFullYear()}
          </div>
        ))}
      </div>
    </>
  );
};

const DisplayWorkerName: React.FC<Props> = ({ tasks }) => {
  const nameToDisplay = [];
  if (tasks.length !== 0) {
    nameToDisplay.push(tasks[0].username);
  }
  return <div className="workername">{nameToDisplay}</div>;
};
