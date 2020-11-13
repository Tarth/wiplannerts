import ReactDOM from "react-dom";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./css/index.css";
import { TabMenu } from "primereact/tabmenu";
import { Calendar } from "./pages/calendar";
import { EntryForm } from "./pages/admin";
import { MenuItem } from "./models/models";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./utility/keycloak";

const Tabmenu: React.FC = () => {
  const initialItems: MenuItem[] = [
    {
      label: "Kalender",
      icon: "pi pi-fw pi-calendar",
      command: () => setActiveItem(items[0]),
    },
    {
      label: "Admin",
      icon: "pi pi-fw pi-user-edit",
      command: () => setActiveItem(items[1]),
    },
  ];
  const initialItem = initialItems[1];

  const [items] = useState<MenuItem[]>(initialItems);
  const [activeItem, setActiveItem] = useState<MenuItem>(initialItem);
  let displaycontent;

  if (activeItem === items[1]) {
    displaycontent = <EntryForm />;
  } else {
    displaycontent = <Calendar />;
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route>
            <TabMenu model={items} activeItem={initialItem} />
            {displaycontent}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <Tabmenu />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
