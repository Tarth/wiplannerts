import React, { useState } from "react";
import "./admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { ListBox } from "primereact/listbox";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { GetWorkers } from "./datahandler";
import { Worker } from "./models";

interface Props {
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
}

export const EntryForm: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([]);

  if (workers.length === 0) {
    GetWorkers(setWorkers);
  }

  return (
    <div className="body">
      <form>
        <Description />
        <DateInput />
        <DateInput />
        <WorkerListBox workers={workers} selectedWorkers={selectedWorkers} setSelectedWorkers={setSelectedWorkers} />
      </form>
    </div>
  );
};

const WorkerListBox: React.FC<Props> = ({ workers, selectedWorkers, setSelectedWorkers }) => {
  return (
    <div className="workers">
      <ListBox
        optionLabel="name"
        value={selectedWorkers}
        options={workers}
        multiple={true}
        onChange={(e) => {
          UpdateSelectedWorkers(e.value as Worker[], setSelectedWorkers)
          // setSelectedWorkers(e.value); 
          // console.log(e.value);
        }}
      />
    </div>
  );
};


const UpdateSelectedWorkers = (value: Worker[], setSelectedWorkers:((input:Worker[]) => void)) => {
  setSelectedWorkers(value);
  console.log(value);
}

const Description = () => {
  return (
    <div className="description">
      <span className="p-float-label">
        <InputText id="description" />
        <label htmlFor="description">Opgavebeskrivelse</label>
      </span>
    </div>
  );
};

const DateInput = () => {
  return (
    <div className="dateinput">
      <span className="p-float-label">
        <Calendar
          id="start"
          dateFormat="dd/mm/yy"
          showTime={true}
          hourFormat="24"
          disabledDays={[0, 6]}
        ></Calendar>
        <label htmlFor="start">Starttid</label>
      </span>
    </div>
  );
};
