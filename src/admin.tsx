import React, { useState } from "react";
import "./admin.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import { ListBox } from "primereact/listbox";
import { GetWorkers } from "./datahandler";
import { Worker } from "./models";

export const EntryForm: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkers, setSelectedWorkers] = useState<Worker[]>([]);

  if (workers.length === 0) {
    GetWorkers(setWorkers);
  }
  console.log(workers);
  // console.log("Skulle være tomt", selectedWorkers);

  return (
    <div>
      <form>
        <ListBox
          optionLabel="name"
          optionValue="id"
          value={workers}
          options={workers}
          multiple={true}
          onChange={(x) => setWorkers(x.value)}
        />
      </form>
    </div>
  );
};
