import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { IsUserLoggedInProp } from "../../models/models";
import { useStyles } from "./style";
import { getUserGroupNumber } from "../../utility/usergroups";

export const Navigation: React.FC<IsUserLoggedInProp> = ({
  isLoggedIn,
  setIsLoggedIn,
  userGroup,
  rememberMe,
}) => {
  const classes = useStyles();

  function Logout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }
  return (
    <>
      <div className={classes.buttonParent}>
        {getUserGroupNumber(userGroup as string) <= 2 ? (
          <div>
            <Link to="/admin">
              <Button variant="contained" color="primary" className={classes.buttonStyle}>
                Admin
              </Button>
            </Link>
            <Link to="/calendar">
              <Button variant="contained" color="primary" className={classes.buttonStyle}>
                Kalender
              </Button>
            </Link>
          </div>
        ) : (
          <></>
        )}

        <div className={classes.logoutButton}>
          <Link to="/">
            <Button
              className={classes.buttonStyle}
              variant="contained"
              color="primary"
              onClick={() => Logout()}
            >
              Log ud
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
