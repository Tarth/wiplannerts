import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#dbdbd9",
    padding: "20px 50px 50px 50px",
    borderRadius: "7px",
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
