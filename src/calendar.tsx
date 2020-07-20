import React, { useState } from "react";
import "./index.css";
import { DataHandler } from "./datahandler";
import { Job } from "./models";
import { addDays, startOfWeek } from "date-fns";

interface Props {
  tasks: Job[];
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
      <div className="workercontainer">
        <DisplayWeekDays />
        <AllWorkers tasks={tasks} />
      </div>
    </>
  );
};

const DisplayWeekDays: React.FC = () => {
  const firstDayOfWeek = startOfWeek(new Date(2020, 6, 27), {
    weekStartsOn: 1,
  });
  const numberOfDays = 5;
  let daysOfTheWeek: Date[];
  for (let i = 1; i <= numberOfDays; i++) {
    daysOfTheWeek = addDays(firstDayOfWeek, i);
  }
  return <div>{firstDayOfWeek.getFullYear()}</div>;
};

const AllWorkers: React.FC<Props> = ({ tasks }) => {
  let allNamesFromDB: String[] = [];

  // Find unique workers
  allNamesFromDB = tasks.map((x) => x.username);
  let uniqWorkers = allNamesFromDB.filter((name, index) => {
    return allNamesFromDB.indexOf(name) === index;
  });

  // Sort job data by worker
  let sortedByWorker = [];
  for (let i = 0; i < uniqWorkers.length; i++) {
    sortedByWorker.push(tasks.filter((x) => x.username === uniqWorkers[i]));
  }

  return (
    <>
      {sortedByWorker.map((x) => (
        <div className="worker">
          <WeeklyTasks tasks={x} />
        </div>
      ))}
    </>
  );
};

const WeeklyTasks: React.FC<Props> = ({ tasks }) => {
  const numberOfDays: Number = 5;
  const firstDayOfWeek = startOfWeek(new Date(2020, 6, 27), {
    weekStartsOn: 1,
  });

  const oneWorkerWeekData = [];

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
          <DailyTasks tasks={x} />
        ))}
      </div>
    </>
  );
};

const DailyTasks: React.FC<Props> = ({ tasks }) => {
  return (
    <>
      <div className="workerjobs">
        {tasks.map((x) => (
          <div className="workerjob">
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
