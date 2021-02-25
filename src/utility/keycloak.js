import Keycloak from "keycloak-js";
const keycloakConfig = {
  url: "http://localhost:8080/auth",
  realm: "wiplanner",
  clientId: "desktopfrontend",
};
const keycloak = new Keycloak(keycloakConfig);
export default keycloak;
