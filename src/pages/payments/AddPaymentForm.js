import { useState,  useEffect} from "react";
import { useForm } from "react-hook-form";
import { Alert, Collapse, Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addPayment } from "api/payments";
import { getAccountList } from "api/account";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Grid } from '@mui/material';
import { TextInput, SelectInput } from "components/form";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';

const AddPaymentForm = () => {

  const [accounts, setAccounts] = useState([]);
  const [alert, setAlert] = useState({
    show: false, severity: 'error', text: ""
  });

  const currentDate = new Date();

  const fetchAccountList = async () => {
    const { data } = await getAccountList();
    if (data.success == true) setAccounts(data.value);
  };

  useEffect(() => {
    fetchAccountList()
  },[]);

  const { handleSubmit, register, control,  formState: { errors } } = useForm();

  const handleAddPayment = async (event) => {
    try {
      const { data } = await addPayment(event);
      setAlert({
        show: true,
        severity: 'success',
        text: data.message + " (the payment needs to be confirmed!)"
      });
    } catch (err) {
      setAlert({
        show: true,
        severity: 'error',
        text: err ? err : "Something went wrong!"
      });
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography sx={{fontWeight: 'bold'}}>Add Payment</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid>
          <Grid item xs={12} mx={2}>
            <Collapse in={alert.show}> 
              <Alert
              severity={alert.severity}
              variant="filled"
              onClose={() => {
                setAlert({
                  ...alert,
                  show: false
                });
              }}
              >{alert.text}</Alert>
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

              <Grid item xs={12} sm={6} md={4} lg={3} px={2} pt={2}>
                <SelectInput
                  control={control}
                  name="AccountId"
                  label="Account"
                  options={accounts}
                  rules={{ required: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={4} lg={3} px={2} pt={2}>
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

              <Grid item xs={12} px={2} py={2}>
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
  )
};

export default AddPaymentForm;