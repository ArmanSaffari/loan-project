import { useState,  useEffect, useLayoutEffect} from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Container, Alert, Collapse, Button } from "@mui/material";
import NavBar from "../../components/navbar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMemFeeList, getMemFee, setMemFee, deleteMemFee } from "api/memFee";
import PlainTable from "components/table";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingIcon from '@mui/icons-material/Pending';
import TextField from '@mui/material/TextField';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Item } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ContactsOutlined, PropaneRounded } from "@mui/icons-material";
import CurrentMemFee from "./CurrentMemFee";
import RequestToIncrease from "./RequestToIncrease";
import MemFeeHistory from "./MemFeeHistory";
import MemFeePaymentHistory from "./MemFeePaymentHistory";

const Membership = () => {

  const [lastMemFee, setLastMemFee] = useState();

  const fetchLastMemFee = async () => {
    const { data } = await getMemFee();
    if (data.success == true) setLastMemFee(data);
  };

  useLayoutEffect(() => { 
    fetchLastMemFee();
    console.log("lastMemFee: ", lastMemFee)
  }, []);
    
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography
        component="h3"
        my={3}
        sx={{fontWeight: 'bold'}}>
          Membership Status
        </Typography>

        <CurrentMemFee 
          lastMemFee={lastMemFee}
        />

        <RequestToIncrease
          lastMemFee={lastMemFee}
        />

        <MemFeeHistory />

        <MemFeePaymentHistory />
        
      </Container>
    </>
  )
  
};

export default Membership;