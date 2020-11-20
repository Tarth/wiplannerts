import ReactDOM from "react-dom";
import React from "react";
import * as serviceWorker from "./serviceWorker";
import "./css/index.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./utility/keycloak";
import { Tabmenu } from "./routes/routes";

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <Tabmenu />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
