import { useState } from 'react'
import { Button, Grid } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AlertDialogSlide from "components/alertDialogSlide";
import { confirmGuarantorship } from "api/guarantor";

const GuaranteeConfirmation = (props) => {

  const [confirmed, setConfirmed] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (event, newValue) => {
    setConfirmed(newValue);
    
  };

  const handleSubmit = async () => {
    try {
      closeDialog()

      const body = { 
        recordId: props.recordId,
        loanId: props.loanId,
        isConfirmed: confirmed
      }

      const  { data }  = await confirmGuarantorship (JSON.stringify(body));
      props.handleAlert(
        {
          show: true,
          severity: (data.success) ? "success" : 'error',
          text: data.message
        }
      )
    } catch (error) {
      props.handleAlert(
        {
          show: true,
          severity: 'error',
          text: error.message
        }
      )
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const dialogButtons = [
    {label: "CANCEL", action: closeDialog},
    {label: "AGREE", action: handleSubmit}
  ];

return (
  <>
   {/* <form onSubmit={handleSubmit}> */}
    <Grid container spacing={1} wrap='nowrap'>
      <Grid item>
        <ToggleButtonGroup
          sx={{height: "25px"}}
          value={confirmed}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value={true} color="success">
            <CheckIcon />
          </ToggleButton>
          <ToggleButton value={false} color="error">
            <ClearIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <Button
          data-record={props.recordId}
          variant="contained"
          type="button"
          onClick={handleOpenDialog}
          sx={{height: "25px"}}
          disabled={(confirmed ===null) ? true : false}
          >submit
        </Button>
      </Grid>
    </Grid>
    <AlertDialogSlide
      title="Are you Sure?"
      content={`Are you sure you want to ${(confirmed) ? "ACCEPT" : "REJECT"} guarantee request of ${props.personName}?`}
      open={openDialog}
      handleClose={closeDialog}
      buttons={dialogButtons}
    />
   {/* </form> */}
  </>
)


};

export default GuaranteeConfirmation