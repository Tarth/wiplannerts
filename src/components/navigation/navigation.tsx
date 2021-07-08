import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { IsUserLoggedInProp } from "../../models/models";
import { useStyles } from "./style";

export const Navigation: React.FC<IsUserLoggedInProp> = ({
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.buttonParent}>
        <div>
          <Link to="/admin">
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonStyle}
            >
              Admin
            </Button>
          </Link>
          <Link to="/calendar">
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonStyle}
            >
              Kalender
            </Button>
          </Link>
        </div>
        <div className={classes.logoutButton}>
          <Link to="/">
            <Button
              className={classes.buttonStyle}
              variant="contained"
              color="primary"
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.clear();
              }}
            >
              Log ud
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
