import React, { useState } from "react";
import { PostLogin, AuthenticateUser } from "../utility/datahandler";
import { ParseJWT } from "../utility/parsetoken";
import { ButtonWrapper } from "../components/utilityComponents/elements/buttonWrapper";
import { RememberMeCheckbox } from "../components/utilityComponents/elements/rememberMeCheckbox";
import { Box, TextField } from "@material-ui/core";
import { useStyles } from "../css/login";
import { IsUserLoggedInProp } from "../models/models";
import WaveTop from "../css/imgs/wave-top.png";
import WaveMid from "../css/imgs/wave-mid.png";
import WaveBot from "../css/imgs/wave-bot.png";

export const Login: React.FC<IsUserLoggedInProp> = ({
  isLoggedIn,
  setIsLoggedIn,
  setUserGroup,
  rememberMe,
  setRememberMe,
}) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function LoginResponse() {
    try {
      const {
        data: {
          isSuccess,
          data: { accessToken, refreshToken },
        },
      } = await PostLogin(username, password);
      if (!isSuccess) {
        setIsError(true);
        setIsLoading(false);
      } else {
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
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <div className={classes.container}>
        <Box
          display="flex"
          flexDirection="column"
          width="25%"
          className={classes.item}
          onKeyPress={async (e) => {
            if (e.key === "Enter") {
              setIsLoading(true);
              await LoginResponse();
            }
          }}
        >
          <h1 className={classes.header}>Wiplanner</h1>
          {isError ? (
            <p className={classes.errorText}>Forkert brugernavn og/eller adgangskode!</p>
          ) : (
            <></>
          )}
          <TextField
            className={classes.textField}
            label="Brugernavn"
            variant="outlined"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            error={isError ? true : false}
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
            error={isError ? true : false}
          ></TextField>

          <RememberMeCheckbox
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
          ></RememberMeCheckbox>
          <ButtonWrapper
            className={classes.button}
            onClick={async () => {
              setIsLoading(true);
              await LoginResponse();
            }}
            caption="Log ind"
            variant="contained"
            color="primary"
          ></ButtonWrapper>
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
