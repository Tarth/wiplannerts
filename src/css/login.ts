import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
  },
  item: {
    backgroundColor: "#fff",
    padding: "20px 50px 50px 50px",
    borderRadius: "7px",
    boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.05)"
  },
  header: { textAlign: "center" },
  textField: {
    marginBottom: "10px",
  },
  button: {
    margin: "25px auto 0 auto",
  },
});

export { useStyles };
