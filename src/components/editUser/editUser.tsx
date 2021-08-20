import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { User, Worker } from "../../models/models";
import { GetWorkers } from "../../utility/datahandler";

export const EditUser = () => {
  const [users, setUsers] = useState<Worker[]>([]);

  useEffect(() => {
    async function FetchUserData() {
      const token: string | null = localStorage.getItem("accesstoken");
      if (token !== null) {
        await GetWorkers(setUsers, token, { querySelector: "" });
      }
    }
    FetchUserData();
  }, []);

  return (
    <div>
      <DataTable
        value={users}
        dataKey="id"
        paginator
        onRowClick={(e) => {
          console.log(e.data);
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
    </div>
  );
};
