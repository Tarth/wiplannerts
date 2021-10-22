import { makeStyles } from "@material-ui/core/styles";
import "./loginWave.css";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(-45deg, #00b4db, #006ab0)",
    backgroundSize: "400% 400%",
    animation: `$gradient 15s ease infinite`,
  },
  "@keyframes gradient": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
  item: {
    backgroundColor: "#fff",
    padding: "20px 50px 50px 50px",
    borderRadius: "7px",
    zIndex: 2,
  },
  header: { textAlign: "center" },
  textField: {
    marginBottom: "10px",
  },
  button: {
    margin: "10px auto 0 auto",
  },
  errorText: {
    color: "red",
  },
});

export { useStyles };
