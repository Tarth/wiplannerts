import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const Navigation = () => {
  const { keycloak, initialized } = useKeycloak();

  const useStyles = makeStyles({
    buttonStyle: {
      // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
      marginRight: "20px",
    },
    buttonDiv: {
      display: "flex",
      width: "95%",
      margin: "auto",
      marginTop: "20px",
      paddingBottom: "50px",
    },
    logoutButton: {
      marginLeft: "auto",
    },
  });
  const classes = useStyles();

  return (
    <>
      <div className={classes.buttonDiv}>
        {keycloak.hasRealmRole("SiteAdmin") ? (
          <>
            <Link to="/">
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
              >
                Kalender
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
              >
                Admin
              </Button>
            </Link>
          </>
        ) : (
          <></>
        )}
        <Button
          className={classes.logoutButton}
          variant="contained"
          color="primary"
          onClick={() => {
            keycloak.logout();
          }}
        >
          Log ud
        </Button>
      </div>
    </>
  );
};
