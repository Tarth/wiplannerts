import React, { useState } from "react";
import "./index.css";
import { DataHandler } from "./datahandler";
import { Job } from "./models";
import { addDays } from "date-fns";

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
      
    </div>
  );
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
      <div className="worker">
        {sortedByWorker.map((x) => (
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
