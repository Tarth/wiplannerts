import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Calendar } from "../pages/calendar";
import { Admin } from "../pages/admin";
import { PrivateRoute } from "./privateroute";
import { Navigation } from "../components/navigation/navigation";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export const Tabmenu: React.FC = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <h3 style={{ textAlign: "center" }}>Indlæser ...</h3>;
  }

  return (
    <>
      {keycloak.authenticated && initialized ? (
        <>
          <BrowserRouter>
            <Navigation></Navigation>
            <Switch>
              <Route exact path="/" component={Calendar}></Route>
              <PrivateRoute
                roles={["SiteAdmin"]}
                path="/admin"
                component={Admin}
              ></PrivateRoute>
            </Switch>
          </BrowserRouter>
        </>
      ) : (
        keycloak.login()
      )}
    </>
  );
};
