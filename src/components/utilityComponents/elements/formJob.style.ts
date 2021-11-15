import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "2em",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5em",
  },
});

export { useStyles };
