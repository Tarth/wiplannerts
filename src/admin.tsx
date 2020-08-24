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
        <h1>Tilføj malerjob:</h1>
        <h3>Beskrivelse:</h3>
        <Description />
        <h3>Start dato:</h3>
        <DateInput />
        <h3>Slut dato:</h3>
        <DateInput />
        <h3>Tilføj medarbejdere:</h3>
        <WorkerListBox
          workers={workers}
          selectedWorkers={selectedWorkers}
          setSelectedWorkers={setSelectedWorkers}
        />
      </form>
    </div>
  );
};

const WorkerListBox: React.FC<Props> = ({
  workers,
  selectedWorkers,
  setSelectedWorkers,
}) => {
  return (
    <div className="workers">
      <ListBox
        optionLabel="name"
        value={selectedWorkers}
        options={workers}
        multiple={true}
        onChange={(e) => {
          UpdateSelectedWorkers(e.value as Worker[], setSelectedWorkers);
          // setSelectedWorkers(e.value);
          // console.log(e.value);
        }}
      />
    </div>
  );
};

// This method is used to show how to call an external funtion. Its getting called from Listbox
const UpdateSelectedWorkers = (
  value: Worker[],
  setSelectedWorkers: (input: Worker[]) => void
) => {
  setSelectedWorkers(value);
  console.log(value);
};

const Description = () => {
  return (
    <div className="description">
      <InputText id="description" />
    </div>
  );
};

const DateInput = () => {
  const [startDate, setStartDate] = useState<Date | Date[]>([]);

  return (
    <div className="dateinput">
      <Calendar
        value={startDate}
        dateFormat="dd/mm/yy"
        showTime={true}
        disabledDays={[0, 6]}
        onChange={(e) => setStartDate(e.value)}
      ></Calendar>
    </div>
  );
};
