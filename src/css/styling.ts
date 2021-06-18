import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dbdbd9",
    width: "100%",
  },
  buttonStyle: {
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginRight: "20px",
  },
  buttonDiv: {
    display: "flex",
    width: "40%",
    margin: "auto",
    marginTop: "20px",
    paddingBottom: "50px",
  },
  logoutButton: {
    marginLeft: "auto",
  },
  textField: {
    marginBottom: "10px",
  },
});

export { useStyles };
