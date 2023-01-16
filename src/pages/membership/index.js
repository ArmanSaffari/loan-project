import { useState,  useEffect} from "react";
import { set, useForm } from "react-hook-form";
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
// import DeleteBotton from "components/deletebotton";

// const DeleteBotton = (props) => {

//   const handelDelete = async (event) => {
//     console.log(event.currentTarget.dataset.record)
//     // try {
//       const { data } = await deleteMemFee(JSON.stringify({
//         memFeeId: event.currentTarget.dataset.record
//       }));
//       console.log(data)
//     // }
//   };

//   return(
//     <Tooltip title="Delete row">
//       <IconButton aria-label="delete"
//         data-record={props.recordId}
//         size="small"
//         color="error"
//         variant="outlined"
//         onClick={handelDelete}>
//         <DeleteIcon />
//       </IconButton>
//     </Tooltip>
//   )
// };

const Membership = () => {


  const [values, setValues] = useState();
  const [lastMemFee, setLastMemFee] = useState();
  const [alert, setAlert] = useState({
    increase: {
      show: false,
      severity: 'error',
      text: ""
    },
    history: {
      show: false,
      severity: 'error',
      text: ""
    }
  });

  useEffect(() => { 
    const fetchMemFeeList = async () => {
      const { data } = await getMemFeeList();
      if (data.success == true) setValues(data.value);
      };

    const fetchLastMemFee = async () => {
      const { data } = await getMemFee();
      console.log(data)
      if (data.success == true) setLastMemFee(data);
      };
    
    fetchLastMemFee();
    fetchMemFeeList();
    
  },[alert]);

  const { handleSubmit, register,  formState: { errors } } = useForm();

  const handleIncreaseMemFee = async (event) => {
    const amountError = { message: "The amount can not be equal or less than last request amount."}
    const dateError = { message: "Specified date can not be ahead of effective date of last request."}
    
    try {

      if (values && event.monthlyMembershipFee <= values[0].monthlyMembershipFee) {
        throw amountError
      } else if (values && event.effectiveFrom < values[0].effectiveFrom) {
        throw dateError
      }
      const { data } = await setMemFee(event);
      setAlert({
        ...alert,
        increase: {
          show: true,
          severity: 'success',
          text: data.message + " (the request needs to be confirmed!)"
        }
      });

    } catch (error) {
      setAlert({
        ...alert,
        increase: {
          show: true,
          severity: 'error',
          text: error.message ? error.message : error.response.data.err.message
        }
      });
    }
  };


  const DeleteBotton = (props) => {

    const handelDelete = async (event) => {
      console.log(event.currentTarget.dataset.record);
  
      try {
        const body = { data: {
          recordId: event.currentTarget.dataset.record
        }};
        const { data } = await props.deleteHandler(body);
        setAlert({
          ...alert,
          history: {
            show: true,
            severity: 'success',
            text: data.message
          }
        })
        console.log(data)
      } catch (error) {
        setAlert({
          ...alert,
          history: {
            show: true,
            severity: 'error',
            text: error.message ? error.message : error.response.data.err.message
          }
        });
      }
    };
  
    return(
      <Tooltip title="Delete row">
        <IconButton aria-label="delete"
          data-record={props.recordId}
          size="small"
          color="error"
          variant="outlined"
          onClick={handelDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    )
  };
  
  //colums and rows to be displayed in membership fee history table
  const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'amount', label: 'Amount($)', minWidth: 60, align: 'center' },
    { id: 'effectiveFrom', label: 'Effective From', minWidth: 100, align: 'center' },
    { id: 'confirmed', label: 'Confirmed', minWidth: 60, align: 'center' },
    { id: 'deleteCol', label: '', minWidth: 50, align: 'center' }
  ];

  const rows = (!values) ? [] : values.map((row, index) => {
    return({
      no: index + 1,
      amount: row.monthlyMembershipFee,
      effectiveFrom: row.effectiveFrom,
      confirmed: (row.confirmation) ?
        <Tooltip title="confirmed"><TaskAltIcon color='success'/></Tooltip> :
        <Tooltip title="waiting to be confirmed"><PendingIcon color='warning' /></Tooltip>,
      deleteCol: (row.confirmation) ? "" :
        <DeleteBotton recordId={row.id} deleteHandler={deleteMemFee}/>
    });
  });
    
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
            <Typography sx={{fontWeight: 'bold'}}>Current</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {(lastMemFee) ? `Current monthly membership fee
            is ${lastMemFee.monthlyMembershipFee} $
            (effective from ${lastMemFee.effectiveFrom}).` :
            `Monthly Membership Fee not found!`}
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
            <Typography sx={{fontWeight: 'bold'}}>Request to increase</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container my={2} sx={{border: "1px solid gray"}}>
              <Grid item xs={12} mt={2} mx={2}>
                <Collapse in={alert.increase.show}> 
                  <Alert
                  severity={alert.increase.severity}
                  variant="filled"
                  onClose={() => {
                    setAlert({
                      ...alert,
                      increase: {
                        text: "",
                        show: false,
                        severity: 'error'
                      }
                    });
                  }}
                  >{alert.increase.text}</Alert>
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
            <Typography sx={{fontWeight: 'bold'}}>History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12} mt={2} mx={2}>
                <Collapse in={alert.history.show}> 
                  <Alert
                  severity={alert.history.severity}
                  variant="filled"
                  onClose={() => {
                    setAlert({
                      ...alert,
                      history: {
                        text: "",
                        show: false,
                        severity: 'error'
                      }
                    });
                  }}
                  >{alert.history.text}</Alert>
                </Collapse> 
              </Grid>
              <Grid item xs={12} mt={2} mx={2}>
                <Typography mb={2}>
                  List of requested monthly membership:
                </Typography>
                <PlainTable columns={columns} rows={rows}/>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  )
  
};

export default Membership;