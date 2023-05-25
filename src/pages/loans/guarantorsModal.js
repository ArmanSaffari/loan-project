import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Modal, Box, Alert, Dialog, Button, Paper, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";
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


const GuarantorsModal = (props) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [guarantorRows, setGuarantorRows] = useState([]);

  const [alert, setAlert] = useState({
    show: false, severity: 'error', text: ""
  });

  const fetchGuarantorList = async (loanId) => {
    const { data } = await guarantorListByLoanId({
      params: { loanId: loanId }
    });
    setGuarantorRows( data.foundRecords );
  };

  const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'id', label: 'ID', minWidth: 30, align: 'center' },
    { id: 'amount', label: 'Amount($)', minWidth: 60, align: 'center' },
    { id: 'installments', label: 'Number of Installments', minWidth: 80, align: 'center' },
    { id: 'guarantorStatus', label: 'Guarantors Status', minWidth: 80, align: 'center' },
    { id: 'nextStep', label: 'Next Step', minWidth: 80, align: 'center' },
    { id: 'deleteCol', label: 'Cancel', minWidth: 50, align: 'center' }
  ];

  const handleAlarm = (alarm) => {
    setAlert(alarm);
  };

  const updatTable = () => {
    fetchGuarantorList(props.loanId)
  }

  const handleAddGuarantor = async (event) => {
    try {
      setAlert({
        ...alert, show: false, text: ""
      });
      const body = {
        loanId: props.loanId,
        ...event
      }
      const { data } = await addGuarantor(body);
      updatTable();
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

  const handleAddLater = () => {
    setAlert({
      show: true,
      severity: "warning",
      text: "Your request has been recorded. It will not proceed unless you specify enough guarantors!"
    });
  };

  useEffect(() => {
    updatTable();
  }, [props.loanId]);

return (
  <Dialog
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
      Gurantors Status for loan number: {props.loanId}
    </DialogTitle>
    <DialogContent sx={{ m: 4 }}>
      <DialogContentText id="alert-dialog-description">
       <AddGuarantorForm
        submitHandler={handleAddGuarantor}
        loanId={props.loanId}
        guarantorRows={guarantorRows}
        finishHandler={props.handleClose}
        addLaterHandler={handleAddLater}
        updateHandler={updatTable}
        modal={true}/>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose} autoFocus>
        Done!
      </Button>
    </DialogActions>
  </Dialog>
)

}

export default GuarantorsModal;
