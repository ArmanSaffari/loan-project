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

const Payments = () => {

  // define states:
  const [values, setValues] = useState();
  const [userSummary, setUserSummary] = useState();
  const [waitingPayments, setWaitingPayments] = useState();
  const [accounts, setAccounts] = useState([]);
  const [alert, setAlert] = useState({
    add: {
      show: false, severity: 'error', text: ""
    }
  });

  const currentDate = new Date();

  // send initial get request for the page:
  useEffect(() => { 

    const fetchMySummary = async () => {
      const { data } = await getMySummary();
      if (data.success == true) setUserSummary(data.value);
    };

    const fetchAccountList = async () => {
      const { data } = await getAccountList();
      if (data.success == true) setAccounts(data.value);
    };
    
    fetchMySummary();
    fetchAccountList();

  },[]);

  const { handleSubmit, register, control,  formState: { errors } } = useForm();

  const handleAddPayment = async (event) => {
    try {
      const { data } = await addPayment(event);
      setAlert({
        ...alert,
        add: {
          show: true,
          severity: 'success',
          text: data.message + " (the payment needs to be confirmed!)"
        }
      });
    } catch (err) {
      setAlert({
        ...alert,
        add: {
          show: true,
          severity: 'error',
          text: err ? err : "Something went wrong!"
        }
      })
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography
        component="h3"
        my={3}
        sx={{fontWeight: 'bold'}}>
          Payments
        </Typography>

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
            <Typography sx={{fontWeight: 'bold'}}>Due Payments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Due membership Fees need to be paide:
              <strong style={{color: 'crimson'}}>
                ${(userSummary) ? Math.max(0, userSummary.memFeeRemained) : "..."}
              </strong>
            </Typography>
            <Typography>
              Due installments need to be paid: 
              <strong style={{color: 'crimson'}}>
                ${(userSummary) ? Math.max(0, userSummary.installmentRemained) : "..."}
              </strong>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              backgroundColor: 'gray',
              borderBottom: '1px solid gray'
            }}
          >
            <Typography sx={{fontWeight: 'bold'}}>Add Payment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12} mx={2}>
                <Collapse in={alert.add.show}> 
                  <Alert
                  severity={alert.add.severity}
                  variant="filled"
                  onClose={() => {
                    setAlert({
                      ...alert,
                      add: {
                        ...alert.add,
                        show: false
                      }
                    });
                  }}
                  >{alert.add.text}</Alert>
                </Collapse> 
              </Grid>

              <form onSubmit={ handleSubmit(handleAddPayment) } style={{ width: "100%" }}> 
                <Grid item container xs={12}>

                  <Grid item xs={12} sm={6} md={4} lg={3} px={2} pt={2}>
                    <TextInput
                    type="datetime-local"
                    defaultValue={currentDate.toISOString().slice(0,16)}
                    name="paymentDate"
                    control={control}
                    label="Payment Date"
                    size="small"
                    rules={{ required: true }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4} lg={3} px={2} pt={2}>
                    <TextInput
                    name="amount"
                    control={control}
                    label="Amount"
                    size="small"
                    type="number"
                    rules={{ required: true, min: 0 }}
                    icon={<AttachMoneyIcon />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}  px={2} pt={2}>
                    <SelectInput
                      control={control}
                      name="AccountId"
                      label="Account"
                      options={accounts}
                      rules={{ required: true }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4} lg={3}  px={2} pt={2}>
                    <TextInput
                    name="referenceNo"
                    control={control}
                    label="Reference No."
                    size="small"
                    rules={{ required: true }}
                    icon={<NumbersIcon />}
                    />
                  </Grid>

                  <Grid item xs={12} px={2} pt={2}>
                    <TextInput
                    name="comment"
                    control={control}
                    label="Comment"
                    size="small"
                    />
                  </Grid>

                  <Grid item xs={12} px={2} pt={2}>
                    <Button
                        variant="contained"
                        size="small"
                        type="submit"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        style={{minWidth: '150px'}}>
                        Submit
                    </Button>
                  </Grid>

                </Grid>
              </form>
            </Grid>
            
          </AccordionDetails>
        </Accordion>
        
        <WaitingPayment />

        <PaymentHistory />
        
      </Container>
    </>
  )
  
};

export default Payments;