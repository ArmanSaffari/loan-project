import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getLoans } from "api/loan";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Box, Divider } from "@mui/material";
import CustomTable from "components/customTable";
import { showDate, showTime } from "components/utilityFunctions";

const LoanHistory = () => {

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
    { id: 'status', label: 'Status', minWidth: 80, align: 'center' },
    { id: 'installments', label: 'Number of Installments', minWidth: 80, align: 'center' }
  ];

  const fetchLoans = async () => {
    
    const { data } = await getLoans({
      params: {
        filter: JSON.stringify( {} ),
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
          paymentDate: showDate(row.loanPaymentDate),
          status: row.loanStatus,
          installments: row.installmentNo
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
        <Typography sx={{fontWeight: 'bold'}}>Loan History</Typography>
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
  )
};

export default LoanHistory;