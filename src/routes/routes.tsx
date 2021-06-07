import React from "react";
import { Calendar } from "../pages/calendar";
import { Admin } from "../pages/admin";
import { Navigation } from "../components/navigation/navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export const Tabmenu: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Navigation></Navigation>
        <Switch>
          <Route exact path="/" component={Calendar}></Route>
          <Route path="/admin" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};
