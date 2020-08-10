import React, { useState } from "react";
import "./admin.css";
// import { InputText } from "primereact/inputtext";
import { GetWorkers } from "./datahandler";

export const EntryForm = () => {
  const [workers, setWorkers] = useState<string[]>([]);
  if (workers.length === 0) {
    GetWorkers(setWorkers);
  }

  return (
    <div>
      <form></form>
    </div>
  );
};
