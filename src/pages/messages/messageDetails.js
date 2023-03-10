import React from 'react';
import { Typography,
  ThemeProvider,
  Container,
  Divider,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
 } from '@mui/material';
 
//icons:
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

import { messageTheme } from 'components/theme';
import { showDate, showTime } from "components/utilityFunctions";

const MessageDetails = ( { onClose, message, show }) => {

  return (
    <ThemeProvider theme={messageTheme}>
      <Dialog onClose={onClose} open={show}>
        <Container className="messageDialogContainer">          

          <Grid container className="dialogTitleContainer">

            <Grid item>
              {(message.priority == 'warning') ? 
              <WarningIcon color='warning' /> :
              <InfoIcon color='info' /> }
            </Grid>

            <Grid item className="messageTitle">
              <Typography variant='h6'>
                {message.title}
              </Typography>
            </Grid>

          </Grid>

          <Divider />

          <Typography variant="caption">
            {showDate(message.createdAt)} , {showTime(message.createdAt)}
          </Typography>

          <DialogContent>
            <DialogContentText>
                {message.content}
            </DialogContentText>
          </DialogContent>
                      
          <DialogActions>
            <Button href={message.link}
            disabled={(message.link) ? true : false}
            >
              Link
            </Button>
            <Button onClick={onClose} >Close</Button>
          </DialogActions>

        </Container>
      </Dialog>
    </ThemeProvider>
  )
}

export default MessageDetails;