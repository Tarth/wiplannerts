import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Calendar } from "./calendar";
import { EntryForm } from "./admin";
import { TabMenu } from "primereact/tabmenu";
import * as serviceWorker from "./serviceWorker";

const Tabmenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Kalender");
  let displaycontent;

  const items = [
    { label: "Kalender", icon: "pi pi-fw pi-home" },
    { label: "Admin", icon: "pi pi-fw pi-calendar" },
  ];

  if (activeTab === "Admin") {
    displaycontent = <EntryForm />;
  } else {
    displaycontent = <Calendar />;
  }

  return (
    <div>
      <TabMenu model={items} onTabChange={(x) => setActiveTab(x.value.label)} />
      {displaycontent}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Tabmenu />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
