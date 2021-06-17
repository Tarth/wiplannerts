import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";

export const Login: React.FC = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="30%"
        style={{
          backgroundColor: "#7dc4fb",
          margin: "20px",
          borderRadius: "6px",
        }}
      >
        <TextField variant="filled" label="Brugernavn"></TextField>
        <TextField
          variant="filled"
          type="password"
          label="password"
        ></TextField>
        <Button>Log ind</Button>
      </Box>
    </>
  );
};
