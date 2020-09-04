import React from "react";
import { ListBox } from "primereact/listbox";
import { Worker } from "../models";

interface Props {
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
}

export const WorkerListBox: React.FC<Props> = ({
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
