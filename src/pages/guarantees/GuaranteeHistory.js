import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getGuarantorRequest } from "api/guarantor";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Box, Tooltip, Divider } from "@mui/material";
import CustomTable from "components/customTable";
// import { SelectInput } from "components/form";
import FilterField from "components/filterField";
import PendingIcon from '@mui/icons-material/Pending';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const GuaranteeHistory = () => {

  const [pagination, setPagination] = useState({
    total: 0,
    limit: 2,
    start: 0,
    end: 0,
    page: 1
  });

  const [rows, setRows] = useState([]);
  
  // define rows and columns
  const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'loanId', label: 'Loan ID', minWidth: 30, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 120, align: 'center' },
    { id: 'loanAmount', label: 'Loan Amount', minWidth: 80, align: 'center' },
    { id: 'installmentAmount', label: 'Installment Amount', minWidth: 80, align: 'center' },
    { id: 'guarantorConfirmation', label: 'Guarantor', minWidth: 80, align: 'center' },
    { id: 'adminConfirmation', label: 'Admin', minWidth: 80, align: 'center' }
  ];

  const statusIcon = (status) => {
    switch (status) {
      case true:
        return <Tooltip title="confirmed!"><TaskAltIcon color='success'/></Tooltip>
      case false:
        return <Tooltip title="not accepted!"><CancelOutlinedIcon color='error'/></Tooltip>
      case null:
        return <Tooltip title="waiting to be approved!"><PendingIcon color='warning' /></Tooltip>
    }
  };

  const fetchGuarantees = async () => {
    
    const { data } = await getGuarantorRequest({
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
          id: row.recordId,
          name: `${row.User.firstName} ${row.User.lastName}`,
          loanAmount: row.Loan.loanAmount,
          installmentAmount: row.Loan.installmentAmount,
          guarantorConfirmation: statusIcon(row.guarantorConfirmation),
          adminConfirmation: statusIcon(row.adminConfirmation)

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
        sx={{
          backgroundColor: 'gray',
          borderBottom: '1px solid gray'
        }}
        onClick={handleOpenAccordion}
      >
        <Typography sx={{fontWeight: 'bold'}}>Gurantee History</Typography>
      </AccordionSummary>

      <AccordionDetails>
      <Grid container>

        <Grid item xs={12} mt={2} mx={2}>
          <Typography>
            {`Total number of ${pagination.total} gurantee requests found!`}
          </Typography>
          {/* <FilterField
            label="Fliter"
            options={filterList}
            /> */}
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

export default GuaranteeHistory;