import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getLoans, deleteLoanRequest } from "api/loan";
import { Grid, Collapse, Alert } from "@mui/material";
import CustomTable from "components/customTable";
import DeleteRowBotton from "components/DeleteRowBotton";

const WaitingLoanRequests = () => {
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 2,
    start: 0,
    end: 0,
    page: 1
  });
  const [rows, setRows] = useState([]);
  const [alert, setAlert] = useState({
    show: false, severity: 'error', text: ""
  });
  
  // define rows and columns
  const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'id', label: 'ID', minWidth: 30, align: 'center' },
    { id: 'amount', label: 'Amount($)', minWidth: 60, align: 'center' },
    { id: 'status', label: 'Status', minWidth: 80, align: 'center' },
    { id: 'installments', label: 'Number of Installments', minWidth: 80, align: 'center' },
    { id: 'deleteCol', label: '', minWidth: 50, align: 'center' }
  ];

  const handleAlarm = (alarm) => {
    setAlert(alarm);
  };

  const fetchLoans = async () => {
    
    const { data } = await getLoans({
      params: {
        filter: JSON.stringify( { "loanStatus": "requested"} ),
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
          id: row.id,
          amount: row.loanAmount,
          status: row.loanStatus,
          installments: row.installmentNo,
          deleteCol: 
            <DeleteRowBotton
              recordId={row.id}
              deleteHandler={deleteLoanRequest}
              updateHandler={fetchLoans}
              alarmHandler={handleAlarm}
            />
        });
      });
      setRows(rowValues);
    }
    
  };

  const handleOpenAccordion = () => {
    fetchLoans(); 
  };

  const handleNextPage = () => {
    const newPage = pagination.page++;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchLoans(); 
  };

  const handlePreviousPage = () => {
    const newPage = pagination.page--;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchLoans();  
  };


  return(
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleOpenAccordion}
      >
        <Typography sx={{fontWeight: 'bold'}}>Waiting Loan Requests</Typography>
      </AccordionSummary>

      <AccordionDetails>
      <Grid container>

        <Grid item xs={12} mt={2} mx={2}>
          <Collapse in={alert.show}> 
            <Alert
            severity={alert.severity}
            variant="filled"
            onClose={() => {
              setAlert({
                ...alert, show: false, text: ""
              });
            }}
            >{alert.text}</Alert>
          </Collapse> 
        </Grid>

        <Grid item xs={12} mt={2} mx={2}>
          <Typography>
            {`Total number of ${pagination.total} waiting loan request(s) found!`}
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

export default WaitingLoanRequests;