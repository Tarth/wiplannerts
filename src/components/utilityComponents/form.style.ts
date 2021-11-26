import { makeStyles } from "@material-ui/core/styles";

const formStyles = makeStyles({
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "2em",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dialogInput: {
    marginBottom: "1em",
    width: "100%",
  },
});

const userStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  formElement: {
    marginBottom: "20px",
  },
  inputLabel: {
    marginLeft: "10px",
  },
});

// const jobStyles = makeStyles({
//   form: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     columnGap: "2em",
//   },
//   leftContainer: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
// });

export { formStyles, userStyles };
