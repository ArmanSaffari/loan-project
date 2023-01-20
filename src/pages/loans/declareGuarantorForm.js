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

const DeclareGuarantorForm = (props) => {

  const { handleSubmit, register, control,  formState: { errors } } = useForm();


  return (
    <>
    </>
  )
};

export default DeclareGuarantorForm;