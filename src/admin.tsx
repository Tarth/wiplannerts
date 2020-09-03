import React, { useState } from "react";
import "./admin.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { ListBox } from "primereact/listbox";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { GetWorkers } from "./datahandler";
import { Worker } from "./models";
import { parse, format, isValid } from "date-fns";

interface Props {
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
}

interface CalendarProps {
  startDate: Date | Date[];
  setStartDate: (date: Date | Date[]) => void;
}

interface InputProps {
  description: string;
  setDescription: (description: string) => void;
}

export const EntryForm: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([]);
  const [startDate, setStartDate] = useState<Date | Date[]>([]);
  const [endDate, setEndDate] = useState<Date | Date[]>([]);
  const [description, setDescription] = useState<string>("");

  if (workers.length === 0) {
    GetWorkers(setWorkers);
  }

  return (
    <div className="body">
      <form>
        <h1>Tilføj malerjob:</h1>
        <h3>Beskrivelse:</h3>
        <Description
          description={description}
          setDescription={setDescription}
        />
        <h3>Start dato:</h3>
        <DateInput startDate={startDate} setStartDate={setStartDate} />
        <h3>Slut dato:</h3>
        <DateInput startDate={endDate} setStartDate={setEndDate} />
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
};

// Inputbox for the job description
const Description: React.FC<InputProps> = ({ description, setDescription }) => {
  return (
    <div className="description">
      <InputText
        id="description"
        value={description}
        keyfilter={/^[^#<>*!]+$/}
        onChange={(e) => {
          setDescription(e.currentTarget.value);
        }}
      />
    </div>
  );
};

//Input for the Calendar field
const DateInput: React.FC<CalendarProps> = ({ startDate, setStartDate }) => {
  const [dateStr, setDateStr] = useState<string>("");
  const [isDateValid, setIsDateValid] = useState<boolean>(true);

  return (
    <div className="dateinput p-inputgroup">
      <InputMask
        mask="99/99/99 99:99"
        placeholder="dd/mm/åå tt:mm"
        style={isDateValid ? {} : { border: "3px solid #d81e1e" }}
        value={dateStr}
        autoClear={false}
        onChange={(e) => {
          if (e.value.indexOf("_") !== -1 || e.value === "") {
            setIsDateValid(true);
            // console.log(e.value);
          }
        }}
        onComplete={(e) => {
          const date = parse(e.value, "dd/MM/yy HH:mm", new Date());
          if (isValid(date) === false) {
            // console.log("Date is false");
            setDateStr(e.value);
            setIsDateValid(false);
          } else {
            // console.log("Date is valid!");
            setStartDate(date);
            setDateStr(e.value);
            setIsDateValid(true);
          }
        }}
      ></InputMask>
      <Calendar
        value={startDate}
        dateFormat="dd/mm/yy"
        showTime={true}
        disabledDays={[0, 6]}
        onChange={(e) => {
          const date = format(e.value as Date, "dd/MM/yy HH:mm");
          setIsDateValid(true);
          setStartDate(e.value);
          setDateStr(date);
        }}
        hideOnDateTimeSelect={true}
        showIcon
      ></Calendar>
    </div>
  );
};
