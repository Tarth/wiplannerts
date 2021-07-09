import React, { useState } from "react";
import { Calendar } from "../pages/calendar";
import { Admin } from "../pages/admin";
import { Login } from "../pages/login";
import { getUserGroupNumber } from "../utility/usergroups";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

export const Index: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userGroup, setUserGroup] = useState("");

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? (
              <Redirect
                to={{
                  pathname: "/calendar",
                  state: {
                    accesstoken: localStorage.getItem("accesstoken"),
                  },
                }}
              />
            ) : (
              <Login
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserGroup={setUserGroup}
              ></Login>
            )}
          </Route>
          {isLoggedIn ? (
            <>
              <Route path="/calendar">
                <Calendar
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                ></Calendar>
              </Route>
              <Route path="/admin">
                <Admin
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                ></Admin>
              </Route>
            </>
          ) : (
            <Redirect exact to="/"></Redirect>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
};
