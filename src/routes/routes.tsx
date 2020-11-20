import React, { useState } from "react";
import { MenuItem } from "../models/models";
import { useKeycloak } from "@react-keycloak/web";
import { Calendar } from "../pages/calendar";
import { EntryForm } from "../pages/admin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";

export const Tabmenu: React.FC = () => {
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
  const { keycloak, initialized } = useKeycloak();
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
