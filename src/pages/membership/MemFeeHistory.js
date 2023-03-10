import { useState,  useEffect, useLayoutEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Alert, Collapse, Grid } from '@mui/material';
import CustomTable from "components/customTable";
import { getMemFeeList, deleteMemFee } from "api/memFee";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingIcon from '@mui/icons-material/Pending';
import Tooltip from '@mui/material/Tooltip';
import DeleteRowBotton from "components/DeleteRowBotton";
import { showDate, showTime } from "components/utilityFunctions";

const MemFeeHistory = (props) => {

  const [alert, setAlert] = useState({
    show: false,
    severity: 'error',
    text: ""
  });
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 5,
    start: 0,
    end: 0,
    page: 1
  });
  const [rows, setRows] = useState([]);

  const fetchMemFeeList = async () => {
    const { data } = await getMemFeeList({
      params: {
        filter: JSON.stringify( { } ),
        order: 'effectiveFrom',
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
          amount: row.monthlyMembershipFee,
          effectiveFrom: showDate(row.effectiveFrom),
          confirmed: (row.confirmation) ?
            <Tooltip title="confirmed"><TaskAltIcon color='success'/></Tooltip> :
            <Tooltip title="waiting to be confirmed"><PendingIcon color='warning' /></Tooltip>,
          deleteCol: (row.confirmation) ? "" :
            <DeleteRowBotton
            recordId={row.id}
            deleteHandler={deleteMemFee}
            updateHandler={fetchMemFeeList}
            alarmHandler={handleAlarm}
        />
          })
        }
      );
      setRows(rowValues);
    }
  };

  const handleAlarm = (alarm) => {
    setAlert(alarm);
  };

  const handleOpenAccordion = () => {
    fetchMemFeeList();
  }

  //colums and rows to be displayed in membership fee history table
  const columns = [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'amount', label: 'Amount($)', minWidth: 60, align: 'center' },
    { id: 'effectiveFrom', label: 'Effective From', minWidth: 100, align: 'center' },
    { id: 'confirmed', label: 'Confirmed', minWidth: 60, align: 'center' },
    { id: 'deleteCol', label: '', minWidth: 50, align: 'center' }
  ];

  const handleNextPage = () => {
    const newPage = pagination.page++;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchMemFeeList(); 
  };

  const handlePreviousPage = () => {
    const newPage = pagination.page--;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchMemFeeList();  
  };

  return (
    <Accordion>
          <AccordionSummary
          onClick={handleOpenAccordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{fontWeight: 'bold'}}>Monthly Membership Fee History</Typography>
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
                      text: "",
                      show: false,
                      severity: 'error'
                    });
                  }}
                  >{alert.text}</Alert>
                </Collapse> 
              </Grid>
              <Grid item xs={12} mt={2} mx={2}>
                <Typography mb={2}>
                  {`Total number of ${pagination.total} confirmed payments found!`}
                </Typography>
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

export default MemFeeHistory;