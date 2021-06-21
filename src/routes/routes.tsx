import React, { useState } from "react";
import { Calendar } from "../pages/calendar";
import { Admin } from "../pages/admin";
import { Login } from "../pages/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export const Index: React.FC = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login></Login>
          </Route>
          <Route path="/calendar">
            <Calendar></Calendar>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
