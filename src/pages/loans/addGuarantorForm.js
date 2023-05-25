import { useState,  useEffect} from "react";
import { useForm } from "react-hook-form";
import { Grid, Alert, Button, Tooltip, IconButton } from "@mui/material";
import { TextInput } from "components/form";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlainTable from 'components/table';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingIcon from '@mui/icons-material/Pending';
import DeleteRowBotton from 'components/DeleteRowBotton';
import { deleteGuarantor, guarantorListByLoanId } from "api/guarantor";

const AddGuarantorForm = (props) => {

  const { handleSubmit, register, control,  formState: { errors } } = useForm();
  
  const columns = (props. guarantorRows
.length == 0) ? [] : [
    { id: 'no', label: 'No.', minWidth: 20, align: 'center' },
    { id: 'name', label: 'Guarantor Name', minWidth: 120, align: 'center' },
    { id: 'guarantor', label: 'Guarantor', minWidth: 60, align: 'center' },
    { id: 'admin', label: 'Admin', minWidth: 60, align: 'center' },
    { id: 'deleteCol', label: '', minWidth: 20, align: 'center' }
  ];

  const rows = props. guarantorRows
.map(
    (record, index) => {return {
      no: index + 1,
      name: `${record.User.firstName} ${record.User.lastName}`,
      guarantor: (record.guarantorConfirmation) ?
        <Tooltip title="confirmed by guarantor.">
          <TaskAltIcon color='success'/></Tooltip> :
        <Tooltip title="needs to be confirmed by guarantor!">
          <PendingIcon color='warning' /></Tooltip>,
      admin: (record.adminConfirmation) ?
        <Tooltip title="confirmed by admin.">
            <TaskAltIcon color='success'/></Tooltip> :
        <Tooltip title="needs to be confirmed by admin!">
          <PendingIcon color='warning' /></Tooltip>,
      deleteCol: <DeleteRowBotton
        recordId={record.recordId}
        deleteHandler={deleteGuarantor}
        updateHandler={props.updateHandler}
        alarmHandler={props.updateHandler}
      /> 
    }}
  );


  return (
    <>
      <Grid container>
        <Grid item xs={12} mb={1}>
          <Alert icon={false} severity="success" >
            {(props. guarantorRows
.length >= 2) ? 
            "Two guarantor have been successfully added!":
            "Now, please specify your guarantors below:"}
          </Alert>
        </Grid>

      {/* sx={{border: "1px solid gray"}} */}

        <form onSubmit={handleSubmit(props.submitHandler)}> 
    
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12} md={6} >
            <TextInput
              name="guarantorId"
              type="number"
              control={control}
              label="Guarantor ID"
              size="small"
              rules={{ required: true }}
              icon={<AttachMoneyIcon />}
              disabled={(props. guarantorRows
.length >= 2) ? true : false}
            />
          </Grid>

          <Grid item xs={12} md={6} >
            <TextInput
              name="guarantorLastName"
              control={control}
              label="Guarantor Last Name"
              size="small"
              rules={{ required: true }}
              disabled={(props. guarantorRows
.length >= 2) ? true : false}
              icon={<PersonIcon />}
            />
          </Grid>

          <Grid item container xs={12} justifyContent="flex-end">
            <Tooltip title="Add Guarantor"
            disabled={(props. guarantorRows
.length >= 2) ? true : false}>
              <IconButton type="submit">
                <AddCircleIcon fontSize="large" color="info" />
              </IconButton>
            </Tooltip>
          </Grid>

        </Grid>
        </form> 
      </Grid>

      <Grid item xs={12} sx={{my: 4}}>
        <PlainTable 
          columns={columns}
          rows={rows} />
      </Grid>
      <Button
        variant="contained"
        onClick={props.finishHandler}
        disabled={ (props. guarantorRows
.length >= 2) ? false : true }
        sx={{
          mt: 1,
          mr: 1,
          display: (props.modal) ? "none" : "block" }}
        > FINISH
      </Button>
      <Button
        variant="outlined"
        onClick={props.addLaterHandler}
        disabled={ (props.loanId) ? false : true }
        sx={{
          mt: 1,
          mr: 1,
          display: (props.modal) ? "none" : "block" }}
        > Add Guarantors Later!
      </Button>
    </>
  )
};

export default AddGuarantorForm;