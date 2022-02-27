import React, { useState, useEffect } from "react";
import { Calendar } from "../pages/calendar";
import { Admin } from "../pages/admin";
import { Login } from "../pages/login";
import { IsAccessTokenValid } from "../utility/datahandler";
import { getUserGroupNumber } from "../utility/usergroups";
import { IndexWrapperProp } from "../models/models";
import { useStickyState } from "../components/utilityComponents/customHooks/useStickyState";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

export const IndexWrapper = () => {
  const [rememberMe, setRememberMe] = useStickyState(false, "rememberMe");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userGroup, setUserGroup] = useState("");
  const [isAccessTokenValid, setIsAccessTokenValid] = useState(false);

  return (
    <Index
      rememberMe={rememberMe}
      setRememberMe={setRememberMe}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      userGroup={userGroup}
      setUserGroup={setUserGroup}
      isAccessTokenValid={isAccessTokenValid}
      setIsAccessTokenValid={setIsAccessTokenValid}
    ></Index>
  );
};

export const Index: React.FC<IndexWrapperProp> = ({
  rememberMe,
  setRememberMe,
  isLoggedIn,
  setIsLoggedIn,
  userGroup,
  setUserGroup,
  isAccessTokenValid,
  setIsAccessTokenValid,
}) => {
  const accessToken = localStorage.getItem("accesstoken");
  const LoginSwitch = () => {
    useEffect(() => {
      async function GetUserTokenValidity() {
        try {
          setIsAccessTokenValid(await IsAccessTokenValid(accessToken));
        } catch (error) {
          return error;
        }
      }
      GetUserTokenValidity();
    }, []);

    if (isAccessTokenValid && (isLoggedIn || rememberMe)) {
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
      console.log("Login");
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
            {getUserGroupNumber(userGroup) <= 3 && isAccessTokenValid ? (
              <>
                <Calendar
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  userGroup={userGroup}
                  rememberMe={rememberMe}
                ></Calendar>
              </>
            ) : (
              <></>
              // <Redirect exact to="/"></Redirect>
            )}
          </Route>
          <Route path="/admin">
            {getUserGroupNumber(userGroup) <= 2 && isAccessTokenValid ? (
              <>
                <Admin
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  userGroup={userGroup}
                  rememberMe={rememberMe}
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
