import React, { useState } from "react";
import "./index.css";
import { DataHandler } from "./datahandler";
import { Job } from "./models";
import { addDays, startOfWeek } from "date-fns";
import { worker } from "cluster";

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
    <div>
      {/*Comments looks like this in JSX*/}
      <AllWorkers tasks={tasks} />
      {/* <DisplayDailyTasksWorker dailyTasks={items}></DisplayDailyTasksWorker> */}
    </div>
  );
};

const AllWorkers: React.FC<Props> = ({ tasks }) => {
  // const [names, setNames] = useState<String[]>([]);
  let allNamesFromDB: String[] = [];
  let workerData = [];
  console.log("Rå Data:", tasks);

  // Find unique workers
  allNamesFromDB = tasks.map((x) => x.username);
  let uniqWorkers = allNamesFromDB.filter((name, index) => {
    return allNamesFromDB.indexOf(name) === index;
  });
  console.log(uniqWorkers);

  workerData.push(tasks.filter((x) => x.username === "Mikkel"));
  console.log(workerData);
  return (
    <>
      <div className="worker">
        {workerData.map((x) => (
          <WeeklyTasks tasks={x} />
        ))}
      </div>
    </>
  );
};

const WeeklyTasks: React.FC<Props> = ({ tasks }) => {
  const numberOfDays: Number = 7;
  // const firstDayOfWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); -- Denne funktion finder datoen for mandag i igangværende uge, og skal bruges fremadrettet efter tests
  const startDateTest = new Date(2020, 6, 27);
  const oneWorkerWeekData = [];

  for (let i = 0; i < numberOfDays; i++) {
    oneWorkerWeekData.push(
      tasks.filter(
        (x) => x.start.getDate() === addDays(startDateTest, i).getDate()
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
  const [width, setWidth] = useState(250);
  return (
    <>
      <div className="workerjobs" style={{ width: width }}>
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
