import { useState,  useEffect} from "react";
import { useForm } from "react-hook-form";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Box, Collapse, Alert, Stepper, Button, Paper, Step, StepLabel, StepContent } from "@mui/material";
import { getEligibility } from "api/loan";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextInput } from "components/form";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Controller } from "react-hook-form";

const LoanRequestForm = (props) => {

  const { handleSubmit, register, control,  formState: { errors } } = useForm();
  
  if (!props.evaluation) {
    return ""

  } else {
    const loans = [
      {
        type: "Normal", 
        eligibility: props.evaluation.normal.eligibility,
        amount: props.evaluation.normal.amount
      },
      {
        type: "Urgent",
        eligibility: props.evaluation.urgent.eligibility,
        amount: props.evaluation.urgent.amount
      }
    ];
    return (
      <>
      <Grid mb={1}>
        <Alert icon={false} severity="success" variant="filled" >
          You are eligible for the following Loans
        </Alert>
      </Grid>

      <form onSubmit={handleSubmit(props.submitHandler)}>
        <Controller
          name="loanType"
          control={control}
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error, invalid },
          }) => (
            <Grid container sx={{ borderRadius: "4px",
              border: `1px solid ${(error) ? "#d32f2f" : "lightgray"}` }} >
              <FormControl
                sx={{ left: "20px"}}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
                error={invalid}
                color="success">
                <FormLabel id="demo-radio-buttons-group-label"
                  sx={{ fontSize: "16px"}}>Select Loan:</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="selectedLoan"
                >
                  {loans.map(loan => {
                    return (
                      <FormControlLabel value={(loan.type).toLowerCase()} 
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }}}
                      control={<Radio />}
                      label={
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: (!loan.eligibility) ? "text.disabled" :
                              ((error) ? "error.main" : "text.primary" )
                          }}>
                          {`${loan.type} Loan (maximum amount: ${loan.amount}${(loan.amount) ? "$" : ""})`}
                        </Typography>}
                      disabled={!loan.eligibility} />
                    )}
                  )}
                </RadioGroup>
              </FormControl>
            </Grid>
          )}
        />

        <TextInput
          name="loanAmount"
          control={control}
          label="Loan Amount"
          size="small"
          rules={{ required: true }}
          icon={<AttachMoneyIcon />}/>

        <TextInput
          name="installmentNo"
          control={control}
          label="Number of Installments"
          size="small"
          rules={{ required: true }}
          icon={<PaymentsIcon />}/>

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 1, mr: 1, display: "block" }}
          > CONTINUE
        </Button>
      </form>
      </>
    )
  }
};

export default LoanRequestForm;