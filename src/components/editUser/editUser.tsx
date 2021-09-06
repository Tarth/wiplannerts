import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Worker } from "../../models/models";
import { GetWorkers } from "../../utility/datahandler";
import { getUserGroupString } from "../../utility/usergroups";
import { EditUserDialog } from "./editUserDialog";

export const EditUser = () => {
  const [users, setUsers] = useState<Worker[]>([]);
  const [usergroupStringUsers, setUsergroupStringUsers] = useState<Worker[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(0);
  const [usergroup, setUsergroup] = useState("worker");
  const [name, setName] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    async function FetchUserData() {
      const token: string | null = localStorage.getItem("accesstoken");
      if (token !== null) {
        await GetWorkers(setUsers, token, { querySelector: "" });
      }
    }
    FetchUserData();
  }, []);

  useEffect(() => {
    let tempArray = users.map((user) => ({
      id: user.id,
      name: user.name,
      password: user.password,
      usergroup_id: getUserGroupString(user.usergroup_id as number),
      username: user.username,
    }));
    setUsergroupStringUsers(tempArray);
  }, [users]);

  return (
    <div>
      <DataTable
        value={usergroupStringUsers}
        dataKey="id"
        paginator
        onRowClick={(e) => {
          setName(e.data.name);
          setPassword(e.data.password);
          setUsergroup(e.data.usergroup_id);
          setUsername(e.data.username);
          setOpenModal(true);
        }}
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
      <EditUserDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        username={username}
        setUsername={setUsername}
        setPassword={setPassword}
        usergroup={usergroup}
        setUsergroup={setUsergroup}
        name={name}
        setName={setUsername}
        userId={userId}
      ></EditUserDialog>
    </div>
  );
};
