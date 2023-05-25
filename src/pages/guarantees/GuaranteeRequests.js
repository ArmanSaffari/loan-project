import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getGuarantorRequest } from "api/guarantor";
import { Grid, Collapse, Alert } from "@mui/material";
import CustomTable from "components/customTable";
import GuaranteeConfirmation from "./GuaranteeConfirmation";

const GuaranteeRequest = () => {

  const [pagination, setPagination] = useState({
    total: 0,
    limit: 2,
    start: 0,
    end: 0,
    page: 1
  });
  const [rows, setRows] = useState([]);
  const [alert, setAlert] = useState(
    {show: false, severity: 'error', text: ""}
  )

  // define rows and columns
  const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'loanId', label: 'Loan ID', minWidth: 30, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 120, align: 'center' },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 100, align: 'center' },
    { id: 'loanAmount', label: 'Loan Amount', minWidth: 80, align: 'center' },
    { id: 'installmentAmount', label: 'Installment Amount', minWidth: 80, align: 'center' },
    { id: 'confirmButton', label: '', minWidth: 80, align: 'center' },
  ];

  const fetchGuarantees = async () => {
    
    const { data } = await getGuarantorRequest({
      params: {
        filter: JSON.stringify( { "guarantorConfirmation": null } ),
        order: 'createdAt',
        limit: pagination.limit,
        page: pagination.page
    }
    });

    if (data.success == true) {
      setPagination({
        ...pagination,
        total: data.totalCount,
        start: data.start,
        end: data.end,
        page: data.page
      });

      let rowValues = data.value.map((row, index) => {        
        return({
          no: index + data.start,
          loanId: row.Loan.id,
          name: `${row.Loan.User.firstName} ${row.Loan.User.lastName}`,
          phoneNumber: row.Loan.User.phoneNumber,
          loanAmount: row.Loan.loanAmount,
          installmentAmount: row.Loan.installmentAmount,
          confirmButton:
            <GuaranteeConfirmation
              handleAlert={handleAlert}
              data-record={row.recordId}
              recordId={row.id}
              loanId={row.Loan.id}
              personName={`${row.Loan.User.firstName} ${row.Loan.User.lastName}`}
            />
        });
      });
      setRows(rowValues);
    }
  };

  const handleOpenAccordion = () => {
    fetchGuarantees(); 
  };

  const handleNextPage = () => {
    const newPage = pagination.page++;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchGuarantees(); 
  };

  const handlePreviousPage = () => {
    const newPage = pagination.page--;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchGuarantees();  
  };

  const handleAlert = (newAlert) => {
    setAlert(newAlert);
    fetchGuarantees();
  };
  // const filterList = [
  //   {key: 0, value: {"guarantorConfirmation": null}, label: "Waiting to be accepted!"},
  //   {key: 1, value: {"guarantorConfirmation": false}, label: "Rejected!"},
  //   {key: 2, value: {"guarantorConfirmation": true}, label: "Accepted!"}
  // ];

  return(
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleOpenAccordion}
      >
        <Typography sx={{fontWeight: 'bold'}}>Waiting Gurantee Request</Typography>
      </AccordionSummary>

      <AccordionDetails>

      <Grid container>

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

        <Grid item xs={12} mt={2} mx={2}>
          <Typography>
            {`Total number of ${pagination.total} gurantee requests found!`}
          </Typography>
        </Grid>

        <Grid item xs={12} mt={2} mx={2}>
          <CustomTable 
            rows={rows}
            columns={columns}
            pagination={pagination}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            />

        </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
};

export default GuaranteeRequest;