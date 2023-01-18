import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getPayments } from "api/payments";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import CustomTable from "components/customTable";

const PaymentHistory = (props) => {

  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    start: 0,
    end: 0,
    page: 1
  });
  const [rows, setRows] = useState([]);
  
  // define rows and columns
  const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'id', label: 'ID', minWidth: 30, align: 'center' },
    { id: 'amount', label: 'Amount($)', minWidth: 60, align: 'center' },
    { id: 'paymentDate', label: 'Payment Date', minWidth: 100, align: 'center' },
    { id: 'referenceNo', label: 'Reference No.', minWidth: 60, align: 'center' },
    { id: 'comment', label: 'Comment', minWidth: 200, align: 'center' }
  ];

  const fetchPayments = async () => {
    console.log("fetchPayment called!")
    const { data } = await getPayments({
      params: {
        filter: JSON.stringify( { confirmation: true } ),
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
          comment: row.comment
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
            <Typography sx={{fontWeight: 'bold'}}>History Of Payments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>

              <Grid item xs={12} mt={2} mx={2}>
                <Typography>
                  {`Total number of ${pagination.total} confirmed payments found!`}
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

export default PaymentHistory;