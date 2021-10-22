import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  buttonGrp: {
    marginTop: "50px",
  },
  button: {
    backgroundColor: "#007ad9",
    marginRight: "20px",
    "&:hover": {
      backgroundColor: "#006DCC",
    },
  },
});

export { useStyle };
