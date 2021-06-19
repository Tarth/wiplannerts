import React from "react";
import { PostLogin } from "../utility/datahandler";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "../css/login";
import { LoginProps } from "../models/models";

export const Login: React.FC<LoginProps> = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  async function LoginResponse() {
    const returnmsg = await PostLogin(username, password);
    console.log(returnmsg);
  }
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
            onClick={async () => await LoginResponse()}               
          >
            Log ind
          </Button>
        </Box>
      </div>
    </>
  );
};
