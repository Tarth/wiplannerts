import { makeStyles } from "@material-ui/core/styles";

const useStylesDialog = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  dialogInput: {
    marginBottom: "1em",
  },
  button: {
    marginRight: "10px",
    backgroundColor: "#007ad9",
    "&:hover": {
      backgroundColor: "#006DCC",
    },
  },
});

export { useStylesDialog };
