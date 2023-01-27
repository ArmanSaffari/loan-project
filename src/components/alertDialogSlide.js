import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import HelpIcon from '@mui/icons-material/Help';
import { Typography } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  /*
  props must include:
  (1) title
  (2) content
  (3) open : states whether the dialog is open or not!
  (4) handleClose: function which set open state to false
  (2) buttons : stating below buttons with the structure of:
    buttons = [
      {label: "button1", action: buttonHandler1},
      ... ];
  */

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <HelpIcon color="primary" fontSize="large"/>
          <Typography ml={2} sx={{display: "inline"}}>{props.title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.buttons.map((button) => {
            return (
              <Button onClick={button.action}>
                {button.label}
              </Button>
            );
          })}
        </DialogActions>
      </Dialog>
    </div>
  );
}