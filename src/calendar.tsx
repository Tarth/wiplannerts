import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { DataHandler } from "./datahandler";
import { Job } from "./models";
import { addDays } from "date-fns"


interface Props {
  tasks: Job[]
}

export const Calendar: React.FC = () => {
  const [tasks, setTasks] = useState <Job[]>([]);
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
}

const DisplayWeeklyTasks: React.FC<Props> = ({tasks}) => {
  const numberOfDays: Number = 5;
  const startDate = new Date(2020, 6, 15)
  //lav for loop, gem det i et array med FilteredData
  const filteredData1 = tasks.filter(x => x.start.getTime() === startDate.getTime());
  const filteredData2 = tasks.filter(x => x.start.getTime() === addDays(startDate, 1).getTime());
  const filteredData3 = tasks.filter(x => x.start.getTime() === addDays(startDate, 2).getTime());
  const filteredData4 = tasks.filter(x => x.start.getTime() === addDays(startDate, 3).getTime());
  const filteredData5 = tasks.filter(x => x.start.getTime() === addDays(startDate, 4).getTime());
  
  //map på FilteredData array og 
  return (
    <div>
      {<DisplayDailyTasksWorker tasks={filteredData1}/>}
      {<DisplayDailyTasksWorker tasks={filteredData2}/>}
      {<DisplayDailyTasksWorker tasks={filteredData3}/>}
      {<DisplayDailyTasksWorker tasks={filteredData4}/>}
      {<DisplayDailyTasksWorker tasks={filteredData5}/>}
    </div>
  );
}


const DisplayDailyTasksWorker: React.FC<Props> = ({tasks}) => {
  console.log(tasks)
  const [width, setWidth] = useState(500);
  
  return (
    <div className="workerjobs" style={{ width: width}}>
      {tasks.map(x => (
        <div className="workerjob">{x.description}</div>
      ))}
    </div>
  );
}

