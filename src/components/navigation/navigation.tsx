import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const Navigation = () => {
  const { keycloak } = useKeycloak();

  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
    test: {
      display: "flex",
      width: "95%",
      margin: "auto",
      marginTop: "20px",
    },
  });
  const classes = useStyles();

  return (
    <>
      {keycloak.hasRealmRole("SiteAdmin") ? (
        <div className={classes.test}>
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              className={classes.root}
            >
              Kalender
            </Button>
          </Link>
          <Link to="/admin">
            <Button
              variant="contained"
              color="primary"
              className={classes.root}
            >
              Admin
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              keycloak.logout();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
