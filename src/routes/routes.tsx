import React from "react";
import { Calendar } from "../pages/calendar";
import { Admin } from "../pages/admin";
import { Login } from "../pages/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export const Index: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/calendar" component={Calendar}></Route>
          <Route path="/admin" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
