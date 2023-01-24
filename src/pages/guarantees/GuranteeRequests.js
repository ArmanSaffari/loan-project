import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GuranteeRequests = () => {
  return(
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: 'gray',
          borderBottom: '1px solid gray'
        }}
        // onClick={summaryHandler}
      >
        <Typography sx={{fontWeight: 'bold'}}>Due Payments</Typography>
      </AccordionSummary>
      <AccordionDetails>
        
      </AccordionDetails>
    </Accordion>
 )
};

export default GuranteeRequests;