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
import AddGuarantorForm from "./addGuarantorForm";
import { addGuarantor, guarantorListByLoanId } from "api/guarantor";

const LoanRequest = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState({
    show: false, severity: 'error', text: ""
  });
  const [evaluation, setEvaluation] = useState();
  const [newLoanId, setNewLoanId] = useState(11);
  const [guarantorRows, setGuarantorRows] = useState([]);

  const fetchGuarantorList = async (loanId) => {
    const { data } = await guarantorListByLoanId({
      params: { loanId: loanId }
    });
    setGuarantorRows( data.foundRecords );
  };

  const handleSendRequest = async (event) => {
    try {
      const { data } = await requestLoan(event);
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
        setNewLoanId(data.newLoan.loanId);
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
        text: err ? err.response.data.err.message : "Something went wrong!"
      });
    }
  };
  
  const handleAddGuarantor = async (event) => {
    try {
      setAlert({
        ...alert, show: false, text: ""
      });
      const body = {
        loanId: newLoanId,
        ...event
      }
      const { data } = await addGuarantor(body);
      fetchGuarantorList(newLoanId)
      setAlert({
        show: true,
        severity: (data.success) ? 'success' : 'warning',
        text: data.message
      });
    } catch (err) {
      setAlert({
        show: true,
        severity: 'error',
        text: err ? err.response.data.err.message : "Something went wrong!"
      });
    }
  };

  const handleFinish = async () => {
    setAlert({
      show: true,
      severity: "success",
      text: "Your request has successfuly completed!"
    });
    setActiveStep( activeStep + 1);
  };

  const handleAddLater = () => {
    setAlert({
      show: true,
      severity: "warning",
      text: "Your request has been recorded. It will not proceed unless you specify enough guarantors!"
    });
    setActiveStep( activeStep + 1);
  };

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

  const handleEligibility = () => {
    fetchEligibility();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStartOver = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: 'Check Eligibility For New Loan',
      description: <>
        <Typography>
          If based on your payments and membership date, you are eligible for either normal or urgent loan, you can proceed to next step.
        </Typography>
        <Button
            variant="contained"
            onClick={handleEligibility}
            sx={{ mt: 1, mr: 1}}
          >Continue
          </Button>
        </>
    },
    {
      label: 'Request for a loan',
      description: <LoanRequestForm 
        evaluation={evaluation}
        submitHandler={handleSendRequest}/>,
    },
    {
      label: 'Add Your Gurantors',
      description: <AddGuarantorForm
        submitHandler={handleAddGuarantor}
        loanId={newLoanId}
        guarantorRows={guarantorRows}
        finishHandler={handleFinish}
        addLaterHandler={handleAddLater} />
    },
    {
      label: "done!",
      description: <>
          <Typography>
            pleaes follow up your request later in 'Waiting Loan Requests' tab below
          </Typography>
          <Button
            variant="contained"
            onClick={handleStartOver}
            sx={{ mt: 1, mr: 1, display: "block" }}
            > Start Another Request
          </Button>
        </>
    }
  ];


  return(
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{fontWeight: 'bold'}}>Loan Request</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={1}>
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

          <Grid item xs={12} md={6}>
            <Box>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          
                          <Button
                            sx={{mt: 1, mr: 1, display: (index === 1) ? "block" : "none"}}
                            onClick={handleBack}>
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>

          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
};

export default LoanRequest;