import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  buttonStyle: {
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginRight: "20px",
  },
  buttonParent: {
    display: "flex",
    width: "95%",
    margin: "auto",
    marginTop: "20px",
    paddingBottom: "50px",
  },
  logoutButton: {
    marginLeft: "auto",
  },
});

export { useStyles };
