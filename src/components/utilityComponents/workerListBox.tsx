import React from "react";
import { Worker, Props } from "../../models/models";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 240,
      backgroundColor: theme.palette.background.paper,
      padding: "0px",
      overflow: "auto",
      maxHeight: "300px",
    },
  })
);

export const CheckboxList: React.FC<Props> = ({ workers, selectedWorkers, setSelectedWorkers }) => {
  const classes = useStyles();

  const handleToggle = (worker: Worker) => () => {
    const currentIndex = selectedWorkers.findIndex((painter) => painter.id === worker.id);
    const newChecked = [...selectedWorkers];

    if (currentIndex === -1) {
      newChecked.push(worker);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectedWorkers(newChecked);
  };
  return (
    <List
      className={classes.root}
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Medarbejdere:
      //   </ListSubheader>
      // }
      // style={{ overflow: "auto", maxHeight: "300px" }}
    >
      {workers.map((e) => {
        const labelId = `checkbox-list-label-${e.id}`;

        return (
          <ListItem key={e.id} role={undefined} dense button selected onClick={handleToggle(e)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedWorkers.some((worker) => worker.id === e.id)}
                tabIndex={-1}
                disableRipple
                color="default"
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={e.name} />
          </ListItem>
        );
      })}
    </List>
  );
};
