import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  leftContainer: {
    marginRight: "40px",
    gridColumn: "1 / 2",
    gridRow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export { useStyles };
