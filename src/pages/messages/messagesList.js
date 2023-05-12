import { useState, useEffect } from "react";

import {
  Grid,
  Tooltip,
  Typography
} from '@mui/material';
import CustomTable from "components/customTable";
import { getMyMessages, getUnreadMessageCount} from "api/message" ;
import { showDate, showTime } from "components/utilityFunctions";

//icons:
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MailIcon from '@mui/icons-material/Mail';

const MessageList = (props) => {

  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    start: 0,
    end: 0,
    page: 1
  });
  const [rows, setRows] = useState([]);
  const [messages, setMessages] = useState([]);

  // define rows and columns
  const columns = [
    { id: 'id', label: 'id', minWidth: 20, align: 'center', hidden: true},
    { id: 'isRead', label: 'unread', minWidth: 20, align: 'center' },
    { id: 'title', label: 'title', minWidth: 200, align: 'left' },
    { id: 'date', label: 'date', minWidth: 60, align: 'center'},
    { id: 'isFlag', label: '', minWidth: 20, align: 'center' }
  ];

  const fetchMessages = async () => {
    const { data } = await getMyMessages({
      params: {
        // filter: JSON.stringify( { confirmation: true } ),
        // order: 'paymentDate',
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

      setMessages(data.value)

      let rowValues = data.value.map((row, index) => {        
        return({
          id: row.id,
          isRead: (row.isRead) ? null :
          <Tooltip title="unread"><MailIcon /></Tooltip>,
          title: row.title,
          date: `${showDate(row.createdAt)} , ${showTime(row.createdAt)}`,
          isFlag: (row.isFlag == false) ? null :
          <Tooltip title="flagged"><FlagCircleIcon /></Tooltip>,
        });
      });
      setRows(rowValues);
    };
  };

  const handleNextPage = () => {
    const newPage = pagination.page++;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchMessages(); 
  };

  const handlePreviousPage = () => {
    const newPage = pagination.page--;
    setPagination({
      ...pagination,
      page: newPage
    });
    fetchMessages();  
  };

  const handleRowSelect = (selectedMessageId) => {
    let selectedMessage = messages.filter(msg => msg.id == selectedMessageId)
    props.handleSelectMessage(selectedMessage)
  };
  
  useEffect(() => {
    fetchMessages();
  }, [props.updatePage])

  return (
    <Grid container>
      <Grid item xs={12} mt={2} mx={2}>
        <Typography>
          {`Total number of ${pagination.total} messages found!`}
        </Typography>
      </Grid>

      <Grid item xs={12} mt={2} mx={2}>
        <CustomTable 
          rows={rows}
          columns={columns}
          pagination={pagination}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          handleRowSelect={handleRowSelect}
          />

      </Grid>
    </Grid>
  )
}


export default MessageList;