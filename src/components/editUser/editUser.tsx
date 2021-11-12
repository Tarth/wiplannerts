import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { AlertProp, Worker, ViewProp } from "../../models/models";
import { GetUsersState } from "../../utility/datahandler";
import { getUserGroupString } from "../../utility/usergroups";
import { ParseJWT } from "../../utility/parsetoken";
import { UserAlertHandler } from "../utilityComponents/userAlert";
import { EditUserDialog } from "./editUserDialog";
import { AddUser } from "../addUser/addUser";
import { useStyles } from "./style";
import { SnackbarWrapper } from "../utilityComponents/elements/snackBarWrapper";

export const EditUser: React.FC<ViewProp> = ({ setViews, usrAlert, setUsrAlert }) => {
  const [users, setUsers] = useState<Worker[]>([]);
  const [usergroupStringUsers, setUsergroupStringUsers] = useState<Worker[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(0);
  const [usergroup, setUsergroup] = useState("worker");
  const [name, setName] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
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

  const AddUserClick = () => {
    setOpenAddModal(true);
  };

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
      setOpenEditModal(true);
    }
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
          <IconButton onClick={AddUserClick} color="primary" aria-label="Tilføj bruger">
            <Add></Add>
          </IconButton>
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
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
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
      <AddUser
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        setUsers={setUsers}
      ></AddUser>
      <SnackbarWrapper
        severity="error"
        message="Du kan ikke redigere den bruger, du er logget ind med"
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      ></SnackbarWrapper>
    </div>
  );
};
