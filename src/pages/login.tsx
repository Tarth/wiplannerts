import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { PostLogin, AuthenticateUser } from "../utility/datahandler";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "../css/login";
import {
  LoginProps,
  LoginResponse,
  IsUserLoggedInProp,
} from "../models/models";
import CircularProgress from "@material-ui/core/CircularProgress";
import WaveTop from "../css/imgs/wave-top.png";
import WaveMid from "../css/imgs/wave-mid.png";
import WaveBot from "../css/imgs/wave-bot.png";

export const Login: React.FC<IsUserLoggedInProp> = ({
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginResponse, setLoginResponse] = useState<LoginResponse>({
    accessToken: "",
    refreshToken: "",
    status: 0,
    statusText: "",
  });

  async function LoginResponse() {
    const returnmsg = await PostLogin(username, password);
    if (returnmsg.hasOwnProperty("response")) {
      if (returnmsg.response.data === "User not found") {
        console.log(returnmsg.response.data);
        setIsLoading(false);
      } else {
        console.log(returnmsg.response.data);
        setIsLoading(false);
      }
    } else {
      const accessToken = returnmsg.data.accessToken;
      const refreshToken = returnmsg.data.refreshToken;
      localStorage.setItem("accesstoken", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);

      if (accessToken !== null) {
        await AuthenticateUser(accessToken);
        setIsLoggedIn(true);
      }
      setIsLoading(false);

      // setIsLoggedIn(true);

      // setLoginResponse({
      //   accessToken: returnmsg.data.accessToken,
      //   refreshToken: returnmsg.data.refreshToken,
      //   status: returnmsg.status,
      //   statusText: returnmsg.statusText,
      // });
    }
  }

  // useEffect(() => {
  //   console.log(loginResponse);
  //   setIsLoading(false);
  // }, [loginResponse]);

  return (
    <>
      <div className={classes.container}>
        <Box
          display="flex"
          flexDirection="column"
          width="25%"
          className={classes.item}
        >
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
            <div
              className="wave waveTop"
              style={{ backgroundImage: `url(${WaveTop})` }}
            ></div>
          </div>
          <div className="waveWrapperInner bgMiddle">
            <div
              className="wave waveMiddle"
              style={{ backgroundImage: `url(${WaveMid})` }}
            ></div>
          </div>
          <div className="waveWrapperInner bgBottom">
            <div
              className="wave waveBottom"
              style={{ backgroundImage: `url(${WaveBot})` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
