import { useState,  useEffect} from "react";
import { useForm } from "react-hook-form";
import { Alert,
  Grid,
  Collapse,
  IconButton,
  Tooltip 
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { TextInput, SelectInput } from "components/form";
import { changeMyInfo } from "api/user"

const ChangeInfoForm = (props) => {

  const { handleSubmit, control,  formState: { errors } } = useForm();
  const [alert, setAlert] = useState({
    show: false, severity: 'error', text: ""
  });

  const handleChangeInfo = async (event) => {
    console.log(event);
    const { data } = await changeMyInfo(event);
    if (data.success) {
      props.handlePostSubmision();
      setAlert({show: false, severity: 'error', text: ""});
    } else {
      setAlert({show: true, severity: 'error', text: data.message});
    }
  };

  const EmploymentStatusOptions = [
		{value: "permanent full-time", label: "permanent full-time"},
		{value: "temporary full-time", label: "temporary full-time"},
		{value: "part-time", label: "part-time"}
	];

  return (
    <form onSubmit={handleSubmit(handleChangeInfo)} >
      <Collapse in={alert.show}> 
        <Alert
        severity={alert.severity}
        variant="standard"
        onClose={() => {
          setAlert({
            ...alert,
            show: false
          });
        }}
        >{alert.text}</Alert>
      </Collapse>

      <Grid container>

        <Grid item sx={{minWidth: "150px"}}>
          {(props.info.id == "employmentStatus") ? 
            <SelectInput
            control={control}
            name={props.info.id}
            options={EmploymentStatusOptions}
            rules={{ required: true, ...props.info.rules }}
            /> :
            <TextInput
              type={props.info.type}
              name={props.info.id}
              control={control}
              size="small"
              rules={{ required: true, ...props.info.rules }}
            />
          }
        </Grid>

        <Grid item>
          <Tooltip title="confirm change" >
            <IconButton  type="submit" size="large">
              <CheckIcon 
              color="success" data-id={props.info.id}/>
            </IconButton>
          </Tooltip>
        </Grid>

      </Grid>
    </form> 
  )
};

export default ChangeInfoForm;