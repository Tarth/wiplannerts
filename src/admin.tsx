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
  setWorkers: () => void;
}

export const EntryForm: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);

  if (workers.length === 0) {
    GetWorkers(setWorkers);
  }

  return (
    <div className="body">
      <form>
        <Description />
        <DateInput />
        <DateInput />
        <WorkerListBox workers={workers} setWorkers={() => setWorkers} />
      </form>
    </div>
  );
};

const WorkerListBox: React.FC<Props> = ({ workers, setWorkers }) => {
  return (
    <div className="workers">
      <ListBox
        optionLabel="name"
        optionValue="id"
        value={workers}
        options={workers}
        multiple={true}
        // onChange={(x) => console.log(x)}
      />
    </div>
  );
};

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
