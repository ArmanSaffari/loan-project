import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Alert, AlertTitle } from '@mui/material';

const CurrentMemFee = (props) => {
  
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        // className='accordionTitle'
        id="panel1a-header"
      >
        <Typography sx={{fontWeight: 'bold'}}>Current</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
        sx= {{ fontWeight: "bold" }}>
        {(props.lastMemFee) ? `Current monthly membership fee
        is ${props.lastMemFee.monthlyMembershipFee} $
        (effective from ${props.lastMemFee.effectiveFrom}).` :
        `Monthly Membership Fee not found!`}
        </Typography>
        {(props.lastMemFee && props.lastMemFee.waitingMemFeeExist) ?
          <Alert severity="info">
            Attention: There is some membership increse request that still is waiting to be confirmed!
          </Alert>
        : "" }
      </AccordionDetails>
    </Accordion>
  )
};

export default CurrentMemFee;