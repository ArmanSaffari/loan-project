import { useState} from "react";
import { useForm } from "react-hook-form";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setMemFee } from "api/memFee";
import { Grid, Collapse, Alert, Button, Item } from '@mui/material';
import TextField from '@mui/material/TextField';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const RequestToIncrease = (props) => {
  
  const [alert, setAlert] = useState({
    show: false,
    severity: 'error',
    text: ""
  });

  const { handleSubmit, register,  formState: { errors } } = useForm();

  const handleIncreaseMemFee = async (event) => {
    const amountError = { message: "The amount can not be equal or less than last request amount."}
    const dateError = { message: "Specified date can not be ahead of effective date of last request."}
    
    try {
      if (props.lastMemFee && event.monthlyMembershipFee <= props.lastMemFee.monthlyMembershipFee) {
        throw amountError
      } else if (props.lastMemFee && event.effectiveFrom < props.lastMemFee.effectiveFrom) {
        throw dateError
      }
      const { data } = await setMemFee(event);
      setAlert({
        show: true,
        severity: 'success',
        text: data.message + " (the request needs to be confirmed!)"
      });

    } catch (error) {
      setAlert({
        show: true,
        severity: 'error',
        text: error.message ? error.message : error.response.data.err.message
      });
    }
  };


  return (
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
        <Typography sx={{fontWeight: 'bold'}}>Request to increase</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container my={2} sx={{border: "1px solid gray"}}>
          <Grid item xs={12} mt={2} mx={2}>
            <Collapse in={alert.show}> 
              <Alert
              severity={alert.severity}
              variant="filled"
              onClose={() => {
                setAlert({
                  text: "",
                  show: false,
                  severity: 'error'
                });
              }}
              >{alert.text}</Alert>
            </Collapse> 
          </Grid>
        <form onSubmit={handleSubmit(handleIncreaseMemFee)}>
          <Grid item xs={12} m={2}>
              <Typography sx={{ display: 'inline' }}>
                I hereby request to increase my monthly membership fee to 
              </Typography>
              <TextField
                id="standard-number"
                name="monthlyMembershipFee"
                type="number"
                size="small"
                {...register('monthlyMembershipFee', {required: "enter amount!"})}
                helperText={errors.monthlyMembershipFee ? errors.monthlyMembershipFee.message : null}
                error={errors.monthlyMembershipFee ? true : false}
                inputProps={{
                  style: {
                    textAlign: 'center',
                    width: '80px',
                    fontWeight: 'bold',
                    color: 'green'
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                />
              <Typography sx={{ display: 'inline' }}>
                effective from
              </Typography>
              <TextField
                variant="standard"
                id="date"
                name="effectiveFrom"
                type="date"
                size="small"
                defaultValue={new Date().toISOString().split('T')[0]}
                {...register('effectiveFrom', {required: "enter date!"})}
                helperText={errors.effectiveFrom ? errors.effectiveFrom.message : null}
                error={errors.effectiveFrom ? true : false}
                inputProps={{
                  style: {
                    textAlign: 'center',
                    width: '140px',
                    fontWeight: 'bold',
                    color: 'green'
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                />
          </Grid>
          <Grid item xs={12} m={2} justify="flex-end">
            <Button
                variant="contained"
                size="small"
                type="submit"
                endIcon={<ArrowForwardIosOutlinedIcon />}>
                Submit
            </Button>
          </Grid>
          </form>
        </Grid>
        
      </AccordionDetails>
    </Accordion>
  )
};

export default RequestToIncrease;