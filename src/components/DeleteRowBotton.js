import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from "@mui/material";

const DeleteRowBotton = (props) => {
    
  /* props must include:
      1. recordId --> the id of the record related to the button
      2. deleteHandler --> a function to call the delete API
      3. alarmHandler --> a function to set alarm on parent component
  */
  const handelDelete = async (event) => {
    console.log(event.currentTarget.dataset.record);

    try {
      const body = { data: {
        recordId: event.currentTarget.dataset.record
      }};

      // console.log("body: ", body)
      const { data } = await props.deleteHandler(body);
      props.alarmHandler({
        show: true,
        severity: 'success',
        text: "success"//data.message
      });
      // console.log(data)
      
    } catch (error) {

      props.alarmHandler({
        show: true,
        severity: 'error',
        text: "error"//error.message ? error.message : error.response.data.err.message
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