import { makeStyles } from "@material-ui/core";

const calendarStyles = makeStyles({
  workerWeek: {
    "&:last-child": {
      borderRight: "1px solid black",
    },
    display: "flex",
    flexGrow: 1,
  },
  workerJobs: {
    display: "flex",
    flex: 1,
    minHeight: "44px",
  },
  workerJob: {
    flex: 1,
    textAlign: "center",
  },
  workerName: {
    width: "100px",
    textAlign: "center",
    fontFamily: "Fjalla One, sans-serif",
    margin: "auto",
  },
  headerDate: {
    flex: 1,
    textTransform: "capitalize",
    fontSize: "x-large",
    padding: "15px 0",
  },
  headersDate: {
    display: "flex",
    paddingLeft: "101px",
    textAlign: "center",
    fontFamily: "Fjalla One, sans-serif",
  },
  headerMonthAndYear: {
    display: "flex",
    justifyContent: "space-evenly",
    fontSize: "50px",
    fontFamily: "Fjalla One, sans-serif",
    backgroundColor: "#dbdbd9",
    width: "100%",
    margin: "0px auto 50px",
    padding: "20px 0",
  },
  headerMonth: {
    textTransform: "uppercase",
    color: "#db5e26",
  },
  headerYear: {
    color: "#db5e26",
  },
  workerContainer: {
    width: "95%",
    margin: "auto",
  },
  leftRightBtngrp: {
    display: "flex",
    justifyContent: "flex-end",
    width: "95%",
    margin: "auto",
    "& button": {
      marginRight: "5px",
      marginBottom: "10px",
    },
  },
});

export { calendarStyles };
