import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Users } from "../../models/models";

export const EditUser = () => {
  const users = [
    {
      id: 4,
      name: "Anne",
      username: "worker3",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 84,
      name: "Arbejder",
      username: "3",
      usergroup_id: 3,
      password: "$2b$10$UC3HdZeaMGQexjMgTk49GeLIDtT.WrYoNouM8NJHqqgNxc0pW1jfC",
    },
    {
      id: 58,
      name: "Benny",
      username: "worker10",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 8,
      name: "Bjørn",
      username: "worker7",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 3,
      name: "Frank",
      username: "worker2",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 118,
      name: "Frontend",
      username: "frontend",
      usergroup_id: 3,
      password: "$2b$10$fO8fxl8LpiZIyAsZDfOS4enq82bj./o1kHUqs6Oy4l1.ZCB2kGbuS",
    },
    {
      id: 9,
      name: "Helle",
      username: "worker8",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 7,
      name: "Jonas",
      username: "worker6",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 10,
      name: "Kenneth",
      username: "worker9",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 6,
      name: "Michael",
      username: "worker5",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 1,
      name: "Mikkel",
      username: "worker11",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 5,
      name: "Rebecca",
      username: "worker4",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 2,
      name: "Torben",
      username: "worker1",
      usergroup_id: 3,
      password: "1",
    },
    {
      id: 76,
      name: null,
      username: "1",
      usergroup_id: 1,
      password: "$2b$10$uh251xM4zrtcuJkvv2sCMeXsEXPBRKB2YErTE4pEqii6GdoDuYVAy",
    },
    {
      id: 77,
      name: null,
      username: "2",
      usergroup_id: 2,
      password: "$2b$10$tdW2pfLTQmyXgObBOQKHfeNy2zGFS4c9/Z/JUGP0kEhJAmKmuIQES",
    },
  ];
  const [selectedUsers, setSelectedUsers] = useState<Users>({
    id: 0,
    name: "",
    username: "",
    usergroup_id: 0,
    password: "",
  });

  return (
    <div>
      <DataTable
        value={users}
        dataKey="id"
        paginator
        selection={selectedUsers}
        // onSelectionChange={(e) => {}}
        selectionMode="single"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Viser {first} til {last} af {totalRecords}"
        rows={20}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column
          field="usergroup_id"
          header="Brugergruppe"
          filter
          sortable
          filterMatchMode="contains"
          filterPlaceholder="Søg brugernavn"
        ></Column>
        <Column
          field="username"
          header="Brugernavn"
          sortable
          filter
          filterMatchMode="contains"
          filterPlaceholder="Søg brugergruppe"
        ></Column>
        <Column
          field="name"
          header="Navn"
          sortable
          filter
          filterMatchMode="contains"
          filterPlaceholder="Søg navn"
        ></Column>
      </DataTable>
    </div>
  );
};
