import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from "@mui/material";

const DeleteRowBotton = (props) => {
    
  /* props must include:
      1. recordId --> the id of the record related to the button
      2. deleteHandler --> a function to call the delete API
      3. alarmHandler --> a function to set alarm on parent component
      4. updateHandler --> update table after one row is deleted
  */
  const handelDelete = async (event) => {
    try {
      const body = { data: {
        recordId: event.currentTarget.dataset.record
      }};

      const { data } = await props.deleteHandler(body);
      props.alarmHandler({
        show: true,
        severity: 'success',
        text: data.message
      });
      
      props.updateHandler();

    } catch (error) {

      props.alarmHandler({
        show: true,
        severity: 'error',
        text: error.message ? error.message : error.response.data.err.message
      });

    }

  };
  return(
    <Tooltip title="Delete row">
      <IconButton aria-label="delete"
        data-record={props.recordId}
        size="small"
        color="error"
        variant="outlined"
        onClick={handelDelete}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
};

export default DeleteRowBotton;