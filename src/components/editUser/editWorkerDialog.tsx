import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogActions } from "@material-ui/core";
import { EditUserDialogProp } from "../../models/models";

export const EditUserDialog: React.FC<EditUserDialogProp> = ({ openModal, setOpenModal }) => {
  const useStyles = makeStyles({
    button: {
      marginRight: "10px",
      backgroundColor: "#007ad9",
      "&:hover": {
        backgroundColor: "#006DCC",
      },
    },
  });

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return <Dialog open={openModal} onClose={handleClose}></Dialog>;
};
