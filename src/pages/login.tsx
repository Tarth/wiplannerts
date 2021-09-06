import React, { useState } from "react";
import { PostLogin, AuthenticateUser } from "../utility/datahandler";
import { ParseJWT } from "../utility/parsetoken";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "../css/login";
import { IsUserLoggedInProp } from "../models/models";
import CircularProgress from "@material-ui/core/CircularProgress";
import WaveTop from "../css/imgs/wave-top.png";
import WaveMid from "../css/imgs/wave-mid.png";
import WaveBot from "../css/imgs/wave-bot.png";

export const Login: React.FC<IsUserLoggedInProp> = ({
  isLoggedIn,
  setIsLoggedIn,
  setUserGroup,
}) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function LoginResponse() {
    const returnmsg = await PostLogin(username, password);
    if (returnmsg.hasOwnProperty("response")) {
      if (returnmsg.response.data === "User not found") {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      const accessToken = returnmsg.data.accessToken;
      const refreshToken = returnmsg.data.refreshToken;
      const userdata = ParseJWT(accessToken);
      localStorage.setItem("accesstoken", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);

      if (setUserGroup !== undefined) {
        setUserGroup(userdata.usergroup);
      }
      if (accessToken !== null) {
        await AuthenticateUser(accessToken);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className={classes.container}>
        <Box display="flex" flexDirection="column" width="25%" className={classes.item}>
          <h1 className={classes.header}>Wiplanner</h1>
          <TextField
            className={classes.textField}
            label="Brugernavn"
            variant="outlined"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></TextField>
          <TextField
            className={classes.textField}
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></TextField>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={async () => {
              setIsLoading(true);
              await LoginResponse();
            }}
            disabled={isLoading ? true : false}
            startIcon={isLoading ? <CircularProgress size={20} /> : <></>}
          >
            Log ind
          </Button>
        </Box>
        <div className="waveWrapper waveAnimation">
          <div className="waveWrapperInner bgTop">
            <div className="wave waveTop" style={{ backgroundImage: `url(${WaveTop})` }}></div>
          </div>
          <div className="waveWrapperInner bgMiddle">
            <div className="wave waveMiddle" style={{ backgroundImage: `url(${WaveMid})` }}></div>
          </div>
          <div className="waveWrapperInner bgBottom">
            <div className="wave waveBottom" style={{ backgroundImage: `url(${WaveBot})` }}></div>
          </div>
        </div>
      </div>
    </>
  );
};
