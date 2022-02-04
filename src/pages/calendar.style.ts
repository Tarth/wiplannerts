import { makeStyles } from "@material-ui/core";

const calendarStyles = makeStyles({
  worker: {
    display: "flex",
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    "&:last-child": {
      borderBottom: "1px solid black",
    },
  },

  workerWeek: {
    display: "flex",
    flexGrow: 1,
  },

  workerJobs: {
    display: "flex",
    flex: 1,
    minHeight: "44px",
    "&div ": {
      borderRight: "1px solid blue",
    },
  },

  workerJob: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "white",
    borderLeft: `1px solid black`,
  },

  workerJobEmpty: {
    flex: 1,
    backgroundColor: "white",
    borderLeft: `1px solid black`,
  },
  workerName: {
    width: "100px",
    textAlign: "center",
    fontFamily: "Fjalla One, sans-serif",
    margin: "auto",
  },
  taskIcon: {
    gridArea: "icon",
  },
  taskDescription: {
    gridArea: "description",
  },
  taskTime: {
    gridArea: "time",
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
