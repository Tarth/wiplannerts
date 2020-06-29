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
  if (tasks.length === 0) {
    const dataHandler = DataHandler();
    setTasks(dataHandler);
  }
  return (
    <div>
      {/*Comments looks like this in JSX*/}
      <DisplayWeeklyTasks tasks={tasks}></DisplayWeeklyTasks>
      {/* <DisplayDailyTasksWorker dailyTasks={items}></DisplayDailyTasksWorker> */}
    </div>
  );
};
// Denne metode skal vise malerens opgaver i løbet af en uge
const DisplayWeeklyTasks: React.FC<Props> = ({ tasks }) => {
  const numberOfDays: Number = 5;
  const firstDayOfWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const oneWorkerWeekData = [];
  // console.log("Component: DisplayWeeklyTasks -", tasks);

  if (oneWorkerWeekData.length === 0) {
    oneWorkerWeekData.push(
      tasks.filter((x) => x.start.getDate() === firstDayOfWeek.getDate())
    );
  }
  for (let i = 0; i < numberOfDays; i++) {
    oneWorkerWeekData.push(
      tasks.filter(
        (x) => x.start.getDate() === addDays(firstDayOfWeek, i).getDate()
      )
    );
  }

  console.log("Component: One Worker Week Data -", oneWorkerWeekData);
  return (
    <>
      <div className="workerweek">
        {oneWorkerWeekData.map((x) => (
          <DisplayDailyTasksWorker tasks={x} />
        ))}
      </div>
    </>
  );
};

const DisplayDailyTasksWorker: React.FC<Props> = ({ tasks }) => {
  // console.log(tasks);
  const [width, setWidth] = useState(500);

  return (
    <>
      <DisplayWorkerName tasks={tasks} />

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
  const nameToDiplay = [];

  if (nameToDiplay.length === 0) {
    nameToDiplay.push(tasks[0].username);
  }

  return <div>Mikkel</div>;
};
