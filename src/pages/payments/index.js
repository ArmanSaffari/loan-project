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
import { getMyPayments, addPayment } from "api/payments";
import { getMySummary } from "api/user";
import { getAccountList } from "api/account";
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
import { TextInput, SelectInput } from "components/form";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';

const Payments = () => {

  // define states:
  const [values, setValues] = useState();
  const [userSummary, setUserSummary] = useState();
  const [accounts, setAccounts] = useState([])
  const [alert, setAlert] = useState({
    add: {
      show: false, severity: 'error', text: ""
    },
    waiting: {
      show: false, severity: 'info', text: ""
    },
    history: {
      show: false, severity: 'info', text: ""
    }
  });

  const currentDate = new Date();

  // send initial get request for the page:
  useEffect(() => { 
    const fetchMyPayments = async () => {
      const { data } = await getMyPayments();
      if (data.success == true) setValues(data.value);
    };

    const fetchMySummary = async () => {
      const { data } = await getMySummary();
      if (data.success == true) setUserSummary(data.value);
    };

    const fetchAccountList = async () => {
      const { data } = await getAccountList();
      if (data.success == true) setAccounts(data.value);
    };

    fetchMyPayments();
    fetchMySummary();
    fetchAccountList();

  },[alert]);

  // requirements for increase mem
  const { handleSubmit, register, control,  formState: { errors } } = useForm();

  const handleAddPayment = async (event) => {
    try {
      const { data } = await addPayment(event);
      setAlert({
        ...alert,
        add: {
          show: true,
          severity: 'success',
          text: data.message + " (the payment needs to be confirmed!)"
        }
      });
    } catch (err) {
      setAlert({
        ...alert,
        add: {
          show: true,
          severity: 'error',
          text: err ? err : "Something went wrong!"
        }
      })
    }
  };

  const WaitingPayment = () => {

    // define rows and columns
    return(
      <>
        <Grid container sx={{border: "1px solid gray"}}>

          <Grid item xs={12} mt={2} mx={2}>
            <Collapse in={alert.waiting.show}> 
              <Alert
              severity={alert.waiting.severity}
              variant="filled"
              onClose={() => {
                setAlert({
                  ...alert,
                  waiting: {
                    ...alert.waiting,
                    show: false }
                });
              }}
              >{alert.waiting.text}</Alert>
            </Collapse> 
          </Grid>

          <Grid item xs={12} mt={2} mx={2}>
            <Typography mb={2}>
              List of requested monthly membership:
            </Typography>
            {/* <PlainTable columns={columns} rows={rows}/> */}
          </Grid>

        </Grid>
      </>
    )
  }
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


  // define rows and columns for payments waiting for confirmation

  // define rows and colums for all confirmed payments

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
              Due membership Fees need to be paide:
              <strong style={{color: 'crimson'}}>
                ${(userSummary) ? Math.max(0, userSummary.memFeeRemained) : "..."}
              </strong>
            </Typography>
            <Typography>
              Due installments need to be paid: 
              <strong style={{color: 'crimson'}}>
                ${(userSummary) ? Math.max(0, userSummary.installmentRemained) : "..."}
              </strong>
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
            <Typography sx={{fontWeight: 'bold'}}>Add Payment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12} mx={2}>
                <Collapse in={alert.add.show}> 
                  <Alert
                  severity={alert.add.severity}
                  variant="filled"
                  onClose={() => {
                    setAlert({
                      ...alert,
                      add: {
                        ...alert.add,
                        show: false
                      }
                    });
                  }}
                  >{alert.add.text}</Alert>
                </Collapse> 
              </Grid>

              <form onSubmit={ handleSubmit(handleAddPayment) } style={{ width: "100%" }}> 
                <Grid item container xs={12}>

                  <Grid item xs={12} sm={6} md={4} lg={3} px={2} pt={2}>
                    <TextInput
                    type="datetime-local"
                    defaultValue={currentDate.toISOString().slice(0,16)}
                    name="paymentDate"
                    control={control}
                    label="Payment Date"
                    size="small"
                    rules={{ required: true }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4} lg={3} px={2} pt={2}>
                    <TextInput
                    name="amount"
                    control={control}
                    label="Amount"
                    size="small"
                    type="number"
                    rules={{ required: true, min: 0 }}
                    icon={<AttachMoneyIcon />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}  px={2} pt={2}>
                    <SelectInput
                      control={control}
                      name="AccountId"
                      label="Account"
                      options={accounts}
                      rules={{ required: true }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4} lg={3}  px={2} pt={2}>
                    <TextInput
                    name="referenceNo"
                    control={control}
                    label="Reference No."
                    size="small"
                    rules={{ required: true }}
                    icon={<NumbersIcon />}
                    />
                  </Grid>

                  <Grid item xs={12} px={2} pt={2}>
                    <TextInput
                    name="comment"
                    control={control}
                    label="Comment"
                    size="small"
                    />
                  </Grid>

                  <Grid item xs={12} px={2} pt={2}>
                    <Button
                        variant="contained"
                        size="small"
                        type="submit"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        style={{minWidth: '150px'}}>
                        Submit
                    </Button>
                  </Grid>

                </Grid>
              </form>
            </Grid>
            
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            sx={{
              backgroundColor: 'gray',
              borderBottom: '1px solid gray'
            }}
          >
            <Typography sx={{fontWeight: 'bold'}}>Paymnent Waiting To Be Confirmed</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <WaitingPayment />
          </AccordionDetails>
        </Accordion>

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