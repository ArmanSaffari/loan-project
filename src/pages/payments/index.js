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
import { getMyPayments } from "api/payments";
import { getMySummary } from "api/user";
import PlainTable from "components/table";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingIcon from '@mui/icons-material/Pending';
import TextField from '@mui/material/TextField';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Item } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ContactsOutlined, Rowing } from "@mui/icons-material";


const Payments = () => {

  // define states:
  const [values, setValues] = useState();
  const [userSummary, setUserSummary] = useState();
  const [alert, setAlert] = useState({
    add: {
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

  // send initial get request for the page:
  useEffect(() => { 
  //   const fetchMyPayments = async () => {
  //     const { data } = await getMyPayments();
  //     if (data.success == true) setValues(data.value);
  //   };

    const fetchMySummary = async () => {
      const { data } = await getMySummary();
      if (data.success == true) setUserSummary(data.value);
    };

    // fetchMyPayments();
    fetchMySummary();

  },[alert]);

  // requirements for increase mem
  const { handleSubmit, register,  formState: { errors } } = useForm();


  // define delete button for history table
  // const DeleteBotton = (props) => {
    
  //   const handelDelete = async (event) => {
  //     console.log(event.currentTarget.dataset.record);

  //     try {
  //       const body = { data: {
  //         memFeeId: event.currentTarget.dataset.record
  //       }};
  //       // console.log("body: ", body)
  //       const { data } = await deleteMemFee(body);
  //       setAlert({
  //         ...alert,
  //         history: {
  //           show: true,
  //           severity: 'success',
  //           text: data.message
  //         }
  //       })
  //       console.log(data)
  //     } catch (error) {
  //       setAlert({
  //         ...alert,
  //         history: {
  //           show: true,
  //           severity: 'error',
  //           text: error.message ? error.message : error.response.data.err.message
  //         }
  //       });
  //     }
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

  //colums and rows to be displayed in membership fee history table
  // const columns = [
  //   { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
  //   { id: 'amount', label: 'Amount($)', minWidth: 60, align: 'center' },
  //   { id: 'effectiveFrom', label: 'Effective From', minWidth: 100, align: 'center' },
  //   { id: 'confirmed', label: 'Confirmed', minWidth: 60, align: 'center' },
  //   { id: 'deleteCol', label: '', minWidth: 50, align: 'center' }
  // ];

  // const rows = (!values) ? [] : values.map((row, index) => {
  //   return({
  //     no: index + 1,
  //     amount: row.monthlyMembershipFee,
  //     effectiveFrom: row.effectiveFrom,
  //     confirmed: (row.confirmation) ?
  //       <Tooltip title="confirmed"><TaskAltIcon color='success'/></Tooltip> :
  //       <Tooltip title="waiting to be confirmed"><PendingIcon color='warning' /></Tooltip>,
  //     deleteCol: (row.confirmation) ? "" : <DeleteBotton recordId={row.id}/>
  //   });
  // });

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography
        component="h3"
        my={3}
        sx={{fontWeight: 'bold'}}>
          Payments
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
            <Typography sx={{fontWeight: 'bold'}}>Due Payments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Membership Fee: 
              ${Math.max(0, userSummary.memFeeRemained)}
            </Typography>
            <Typography>
              Remained Installments:
              ${Math.max(0, userSummary.installmentRemained)}
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              backgroundColor: 'gray',
              borderBottom: '1px solid gray'
            }}
          >
            <Typography sx={{fontWeight: 'bold'}}>Add Payment</Typography>
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
            <form onSubmit={handleSubmit()}>
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
        </Accordion> */}
        
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            sx={{
              backgroundColor: 'gray',
              borderBottom: '1px solid gray'
            }}
          >
            <Typography sx={{fontWeight: 'bold'}}>Paymnent Waiting To Be Confirmed!</Typography>
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
            <form onSubmit={handleSubmit()}>
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
        </Accordion> */}

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
            sx={{
              backgroundColor: 'gray',
              borderBottom: '1px solid gray'
            }}
          >
            <Typography sx={{fontWeight: 'bold'}}>History Of All Payments</Typography>
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
        </Accordion> */}

      </Container>
    </>
  )
  
};

export default Payments;