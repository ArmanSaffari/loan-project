import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Box, Collapse, Alert, Stepper, Button, Paper, Step, StepLabel, StepContent } from "@mui/material";
import { getEligibility, requestLoan } from "api/loan";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextInput } from "components/form";
import LoanRequestForm from "./loanRequestForm";
import DeclareGuarantorForm from "./declareGuarantorForm";

const LoanRequest = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState({
    show: false, severity: 'error', text: ""
  });
  const [evaluation, setEvaluation] = useState();


  const handleSendRequest= async (event) => {
    try {
      const { data } = await requestLoan(event);
      // console.log(event)
      if (!data) {
        setAlert({
          show: true,
          severity: 'danger',
          text: "something went wrong!"
        });
      } else if (data.success) {
        setAlert({
          show: true,
          severity: 'success',
          text: data.message 
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        setAlert({
          show: true,
          severity: 'success',
          text: (data.err.message) ? data.err.message : "something went wrong!"
        });
      }
      
    } catch (err) {
      setAlert({
        show: true,
        severity: 'error',
        text: err.message ? err.message : "Something went wrong!"
      });
    }
  };
  const steps = [
    {
      label: 'Check Eligibility For New Loan',
      description: `If based on your payments and membership date, you are eligible for either normal or urgent loan, you can proceed to next step.`,
    },
    {
      label: 'Request for a loan',
      description: <LoanRequestForm 
        evaluation={evaluation}
        submitHandler={handleSendRequest}/>,
    },
    {
      label: 'Declare Your Gurantors',
      description: <DeclareGuarantorForm />
    },
  ];

  const fetchEligibility = async () => {
    const error = { message: "something went wrong!" }
    try{
      const { data } = await getEligibility();
      if (data.success == true) {
        setEvaluation(data.evaluation);
        if (!data.evaluation.normal.eligibility && !data.evaluation.urgent.eligibility) {
          setAlert({
            show: true, severity: 'warning', text: data.evaluation.message
          });
        } else {
          setAlert({
            ...alert, show: false, text: ""
          });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } else {
        throw error
      }
    } catch(error) {
      setAlert({
        show: true, severity: 'error', text: error.message
      });
    }
  };

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        fetchEligibility();
        break;
      case 1:
        console.log("step2");
        break;
      case 2:
        console.log("step2");
        break;
      default:
        // 
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
      >
        <Typography sx={{fontWeight: 'bold'}}>Loan Request</Typography>
      </AccordionSummary>

      <AccordionDetails>

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

        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1, display: (index == 1) ? "none" : "block" }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      {/* <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button> */}
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
};

export default LoanRequest;