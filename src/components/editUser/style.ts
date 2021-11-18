import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  alertDiv: {
    marginBottom: "1em",
  },
  spinnerDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "75vh",
  },
});

const useStylesDialog = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  userInputWrapper: {
    marginBottom: "1em",
  },
  dialogInput: {
    marginBottom: "1em",
    width: "100%",
  },
  passwordWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginRight: "10px",
    backgroundColor: "#007ad9",
    "&:hover": {
      backgroundColor: "#006DCC",
    },
  },
});

const useStylesConfirmationDialog = makeStyles({
  deleteButton: {
    marginRight: "auto",
  },
});

export { useStylesDialog, useStyles, useStylesConfirmationDialog };
