import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { AlertProp, Worker } from "../../models/models";
import { GetUsersState } from "../../utility/datahandler";
import { getUserGroupString } from "../../utility/usergroups";
import { ParseJWT } from "../../utility/parsetoken";
import { EditUserDialog } from "./editUserDialog";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { useStyles } from "./style";

export const EditUser = () => {
  const [users, setUsers] = useState<Worker[]>([]);
  const [usergroupStringUsers, setUsergroupStringUsers] = useState<Worker[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(0);
  const [usergroup, setUsergroup] = useState("worker");
  const [name, setName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userAlert, setUserAlert] = useState<AlertProp>({
    type: "info",
    title: "Information",
    text: "Brug tabellen nedenfor til at slette eller redigere en bruger.",
  });

  const classes = useStyles();

  useEffect(() => {
    async function FetchUserData() {
      const token: string | null = localStorage.getItem("accesstoken");
      if (token !== null) {
        await GetUsersState(token, setUsers);
      }
    }
    FetchUserData().then(() => {
      setLoading(false);
    });
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

  const RowClick = (e: any) => {
    setName(e.data.name);
    setPassword(e.data.password);
    setUsergroup(e.data.usergroup_id);
    setUsername(e.data.username);
    setUserId(e.data.id);
    const parsedToken = ParseJWT(localStorage.getItem("accesstoken") as string);
    if (e.data.username === parsedToken.username) {
      setOpenSnackbar(true);
    } else {
      setOpenModal(true);
    }
  };

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  let alert = (
    <div className={classes.alertDiv}>
      <UserAlertHandler
        type={userAlert.type}
        title={userAlert.title}
        text={userAlert.text}
      ></UserAlertHandler>
    </div>
  );
  return (
    <div>
      {loading ? (
        <div className={classes.spinnerDiv}>
          <CircularProgress size="10rem" />
        </div>
      ) : (
        <div>
          {alert}
          <DataTable
            value={usergroupStringUsers}
            dataKey="id"
            paginator
            onRowClick={RowClick}
            selectionMode="single"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Viser {first} til {last} af {totalRecords}"
            rows={20}
            rowsPerPageOptions={[10, 20, 50]}
          >
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
            <Column
              field="usergroup_id"
              header="Brugergruppe"
              filter
              sortable
              filterMatchMode="contains"
              filterPlaceholder="Søg brugernavn"
            ></Column>
          </DataTable>
        </div>
      )}
      <EditUserDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        usergroup={usergroup}
        setUsergroup={setUsergroup}
        name={name}
        setName={setName}
        userId={userId}
        setUsers={setUsers}
        setUserAlert={setUserAlert}
        setLoading={setLoading}
      ></EditUserDialog>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error">
          Du kan ikke redigere den bruger, du er logget ind på
        </Alert>
      </Snackbar>
    </div>
  );
};
