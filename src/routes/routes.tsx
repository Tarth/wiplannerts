import React, { useState, useEffect } from "react";
import { Calendar } from "../pages/calendar";
import { Admin } from "../pages/admin";
import { Login } from "../pages/login";
import { IsAccessTokenValid } from "../utility/datahandler";
import { getUserGroupNumber } from "../utility/usergroups";
import { Logout } from "../utility/logout";
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
  const LoginSwitch = () => {
    const accessToken = localStorage.getItem("accesstoken");
    useEffect(() => {
      async function GetUserTokenValidity() {
        try {
          setIsAccessTokenValid(await IsAccessTokenValid(accessToken));
        } catch (error) {
          console.log(error);
        }
      }
      GetUserTokenValidity();
      return () => {};
    }, []);

    if (isAccessTokenValid && rememberMe) {
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
    }

    if (isAccessTokenValid && isLoggedIn) {
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
    }

    return (
      <Login
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserGroup={setUserGroup}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
      ></Login>
    );
  };

  const RouteCalendar = () => {
    const accessToken = localStorage.getItem("accesstoken");
    useEffect(() => {
      async function GetUserTokenValidity() {
        try {
          setIsAccessTokenValid(await IsAccessTokenValid(accessToken));
        } catch (error) {
          console.log(error);
        }
      }
      GetUserTokenValidity();
      return () => {};
    }, []);

    if (getUserGroupNumber(userGroup) <= 3 && isAccessTokenValid) {
      return (
        <Calendar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userGroup={userGroup}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        ></Calendar>
      );
    } else {
      Logout(setRememberMe, setIsLoggedIn);
      return <Redirect exact to="/"></Redirect>;
    }
  };

  const RouteAdmin = () => {
    if (getUserGroupNumber(userGroup) <= 2 && isAccessTokenValid) {
      return (
        <Admin
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userGroup={userGroup}
          rememberMe={rememberMe}
        ></Admin>
      );
    } else {
      Logout(setRememberMe, setIsLoggedIn);
      return <Redirect exact to="/"></Redirect>;
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
            <RouteCalendar></RouteCalendar>
          </Route>
          <Route path="/admin">
            <RouteAdmin></RouteAdmin>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
