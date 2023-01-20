import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Box, Collapse, Alert, Stepper, Button, Paper, Step, StepLabel, StepContent } from "@mui/material";
import { getEligibility } from "api/loan";

const LoanRequest = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState({
    show: false, severity: 'error', text: ""
  });
  const [evaluation, setEvaluation] = useState();

  const steps = [
    {
      label: 'Check Eligibility For New Loan',
      description: `If based on your payments and membership date, you are eligible for either normal or urgent loan, you can proceed to next step.`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];

  const fetchEligibility = async () => {
    try{
      const { data } = await getEligibility();
      if (data.success == true) {
        setEvaluation(data.evaluation);
        if (!data.evaluation.normal.eligibility && !data.evaluation.urgent.eligibility) {
          setAlert({
            show: true, severity: 'warning', text: data.evaluation.message
          });
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
    } catch(error) {
      setAlert({
        show: true, severity: 'error', text: "something went wrong!"
      });
    }
  };

  // const handleOpenAccardion = () => {
  //   fetchEligibility();
  // };

  const handleNext = () => {
    // console.log(activeStep)
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
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
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