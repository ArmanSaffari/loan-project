import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMySummary } from "api/user";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Box, Divider } from "@mui/material";

const LoanHistory = () => {

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
      >
        <Typography sx={{fontWeight: 'bold'}}>Loan History</Typography>
      </AccordionSummary>

      <AccordionDetails>

      </AccordionDetails>
    </Accordion>
  )
};

export default LoanHistory;