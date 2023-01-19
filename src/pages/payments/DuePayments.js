import { useState,  useEffect} from "react";
import { useForm } from "react-hook-form";
import { Container, Alert, Collapse, Button } from "@mui/material";
import NavBar from "../../components/navbar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMyPayments, getPayments, addPayment } from "api/payments";
import { getMySummary } from "api/user";
import { getAccountList } from "api/account";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Grid, Item } from '@mui/material';
import { TextInput, SelectInput } from "components/form";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';
import PaymentHistory from "./paymentHistory";
import WaitingPayment from "./WaitingPayment";
import AddPaymentForm from "./AddPaymentForm";

const DuePayemnts = () => {
  const [userSummary, setUserSummary] = useState();

  const fetchMySummary = async () => {
    const { data } = await getMySummary();
    if (data.success == true) setUserSummary(data.value);
  };

  // useEffect(() => { 
  //   fetchMySummary();
  // },[]);

  const summaryHandler = () => {
    fetchMySummary();
  };

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
        onClick={summaryHandler}
      >
        <Typography sx={{fontWeight: 'bold'}}>Due Payments</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {"Due membership Fees need to be paide: "}
          <strong style={{color: 'crimson'}}>
            {(userSummary) ?`${Math.max(0, userSummary.memFeeRemained)}$` : "..."}
          </strong>
        </Typography>
        <Typography>
          {"Due installments need to be paid: "}
          <strong style={{color: 'crimson'}}>
            {(userSummary) ? `${Math.max(0, userSummary.installmentRemained)}$` : "..."}
          </strong>
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
};

export default DuePayemnts;