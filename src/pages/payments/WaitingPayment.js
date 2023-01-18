import { useState } from "react";
import {
  Alert,
  Collapse,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getPayments, deletePayment } from "api/payments";
import DeleteRowBotton from "components/DeleteRowBotton";
import CustomTable from "components/customTable";

const WaitingPayment2 = (props) => {

  // set states
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    start: 0,
    end: 0,
    page: 1
  });

  const [rows, setRows] = useState([]);

  const [alert, setAlert] = useState({
    show: false, severity: 'error', text: ""
  });

  // define columns
  const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'id', label: 'ID', minWidth: 30, align: 'center' },
    { id: 'amount', label: 'Amount($)', minWidth: 60, align: 'center' },
    { id: 'paymentDate', label: 'Payment Date', minWidth: 100, align: 'center' },
    { id: 'referenceNo', label: 'Reference No.', minWidth: 60, align: 'center' },
    { id: 'deleteCol', label: '', minWidth: 50, align: 'center' }
  ];

  const handleAlarm = (alarm) => {
    setAlert(alarm);
  }

  const fetchPayments = async () => {
    console.log("fetchPayment called!")
    const { data } = await getPayments({
      params: {
        filter: JSON.stringify( { confirmation: false } ),
        order: 'paymentDate',
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
      })

      let rowValues = data.value.map((row, index) => {        
        return({
          no: index + data.start,
          id: row.id,
          amount: row.amount,
          paymentDate: row.paymentDate,
          referenceNo: row.referenceNo,
          deleteCol: (row.confirmation) ? "" :
            <DeleteRowBotton
              recordId={row.id}
              deleteHandler={deletePayment}
              alarmHandler={handleAlarm}
            />
        });
      });
      setRows(rowValues);
    }
    
  };

  const handleOpenAccordion = () => {
    fetchPayments(); 
  };

  const handleNextPage = () => {
    const newPage = pagination.page++;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchPayments(); 
  };

  const handlePreviousPage = () => {
    const newPage = pagination.page--;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchPayments();  
  };

  return (
    <>
    <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
            sx={{
              backgroundColor: 'gray',
              borderBottom: '1px solid gray'
            }}
            onClick={handleOpenAccordion}
          >
            <Typography sx={{fontWeight: 'bold'}}>Waiting Payments</Typography>
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
              <Grid item xs={12} mx={2}>
                <Typography>
                  {`Total number of ${pagination.total} payment(s) waiting to be confirmed by admin!`}
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
    </>
  )
};

export default WaitingPayment2;