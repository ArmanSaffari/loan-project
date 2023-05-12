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
  Button,
 } from '@mui/material';
 
//icons:
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

import { messageTheme } from 'components/theme';
import { showDate, showTime } from "components/utilityFunctions";

const MessageDetails = ( { onClose, message, show }) => {

  const MessageRender = (messageContent) => {
    console.log(messageContent)
    return (
      messageContent
    )
  };

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
            disabled={(message.link === null) ? true : false}
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


{/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key="FY"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Frozen Yoghurt
            </TableCell>
            <TableCell align="right">159</TableCell>
            <TableCell align="right">6</TableCell>
            <TableCell align="right">37</TableCell>
            <TableCell align="right">24</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer> */}