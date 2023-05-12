import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMySummary } from "api/user";

const DuePayemnts = () => {
  const [userSummary, setUserSummary] = useState();

  const fetchMySummary = async () => {
    const { data } = await getMySummary();
    if (data.success == true) setUserSummary(data.value);
  };

  const summaryHandler = () => {
    fetchMySummary();
  };

  return(
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={summaryHandler}
      >
        <Typography sx={{fontWeight: 'bold'}}>Due Payments</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {"Due membership Fees need to be paid: "}
          <strong style={{color: 'crimson'}}>
            {(userSummary) ?`${Math.max(0, (userSummary.memFeeRemained).toFixed(2))}$` : "..."}
          </strong>
        </Typography>
        <Typography>
          {"Due installments need to be paid: "}
          <strong style={{color: 'crimson'}}>
            {(userSummary) ? `${Math.max(0, (userSummary.installmentRemained).toFixed(2))}$` : "..."}
          </strong>
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
};

export default DuePayemnts;