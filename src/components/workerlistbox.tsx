import React from "react";
import { ListBox } from "primereact/listbox";
import { Worker } from "../models";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

interface Props {
  workers: Worker[];
  selectedWorkers: Worker[];
  setSelectedWorkers: (worker: Worker[]) => void;
}

export const WorkerListBox: React.FC<Props> = ({
  workers,
  selectedWorkers,
  setSelectedWorkers,
}) => {
  return (
    <div className="workers">
      <ListBox
        optionLabel="name"
        value={selectedWorkers}
        options={workers}
        multiple={true}
        onChange={(e) => {
          UpdateSelectedWorkers(e.value as Worker[], setSelectedWorkers);
        }}
      />
    </div>
  );
};

// This method is used to show how to call an external funtion. Its getting called from Listbox
const UpdateSelectedWorkers = (
  value: Worker[],
  setSelectedWorkers: (input: Worker[]) => void
) => {
  setSelectedWorkers(value);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            {/* <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction> */}
          </ListItem>
        );
      })}
    </List>
  );
}
