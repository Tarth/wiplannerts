import React, { useState } from "react";
import { Calendar } from "../pages/calendar";
import { Admin } from "../pages/admin";
import { Login } from "../pages/login";
import { IsAccessTokenValid } from "../utility/datahandler";
import { getUserGroupNumber } from "../utility/usergroups";
import { useStickyState } from "../components/utilityComponents/customHooks/useStickyState";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

export const Index: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userGroup, setUserGroup] = useState("");
  const [rememberMe, setRememberMe] = useStickyState(false, "rememberMe");
  const accessToken = localStorage.getItem("accesstoken");

  const LoginSwitch: React.FC = () => {
    if (isLoggedIn && IsAccessTokenValid(accessToken)) {
      return (
        <Redirect
          to={{
            pathname: "/calendar",
            state: {
              accesstoken: accessToken,
            },
          }}
        />
      );
    } else {
      return (
        <Login
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserGroup={setUserGroup}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        ></Login>
      );
    }
  };
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LoginSwitch></LoginSwitch>
          </Route>
          <Route path="/calendar">
            {isLoggedIn && getUserGroupNumber(userGroup) <= 3 && IsAccessTokenValid(accessToken) ? (
              <>
                <Calendar
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  userGroup={userGroup}
                ></Calendar>
              </>
            ) : (
              <Redirect exact to="/"></Redirect>
            )}
          </Route>
          <Route path="/admin">
            {isLoggedIn && getUserGroupNumber(userGroup) <= 2 && IsAccessTokenValid(accessToken) ? (
              <>
                <Admin
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  userGroup={userGroup}
                ></Admin>
              </>
            ) : (
              <Redirect exact to="/"></Redirect>
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
