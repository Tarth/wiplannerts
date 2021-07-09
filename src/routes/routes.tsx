import React, { useState } from "react";
import { Calendar } from "../pages/calendar";
import { Admin } from "../pages/admin";
import { Login } from "../pages/login";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

export const Index: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userGroup, setUserGroup] = useState("");
  const [test, setTest] = useState(true);

  enum userGroups {
    winotoadmin = 1,
    planner = 2,
    worker = 3,
  }

  function getUserGroupNumber(usergroup: number) {
    const _userGroupEnum = userGroups;
    if (_userGroupEnum.hasOwnProperty(usergroup)) {
      return _userGroupEnum[usergroup];
    }
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {isLoggedIn && userGroup <= userGroups.worker ? (
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
          {isLoggedIn && test ? (
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
