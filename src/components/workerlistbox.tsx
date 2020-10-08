import React from "react";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const CheckboxList: React.FC<Props> = ({
  workers,
  selectedWorkers,
  setSelectedWorkers,
}) => {
  const classes = useStyles();

  const handleToggle = (worker: Worker) => () => {
    const currentIndex = selectedWorkers.indexOf(worker);
    const newChecked = [...selectedWorkers];

    if (currentIndex === -1) {
      newChecked.push(worker);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectedWorkers(newChecked);
  };
  return (
    <List className={classes.root}>
      {workers.map((e) => {
        const labelId = `checkbox-list-label-${e.id}`;

        return (
          <ListItem
            key={e.id}
            role={undefined}
            dense
            button
            selected
            onClick={handleToggle(e)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedWorkers.indexOf(e) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={e.name} />
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
};

// export const WorkerListBox: React.FC<Props> = ({
//   workers,
//   selectedWorkers,
//   setSelectedWorkers,
// }) => {
//   return (
//     <div className="workers">
//       <ListBox
//         optionLabel="name"
//         value={selectedWorkers}
//         options={workers}
//         multiple={true}
//         onChange={(e) => {
//           UpdateSelectedWorkers(e.value as Worker[], setSelectedWorkers);
//         }}
//       />
//     </div>
//   );
// };

// This method is used to show how to call an external funtion. Its getting called from Listbox
// const UpdateSelectedWorkers = (
//   value: Worker[],
//   setSelectedWorkers: (input: Worker[]) => void
// ) => {
//   setSelectedWorkers(value);
// };
