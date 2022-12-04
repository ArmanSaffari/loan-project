import React from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { Button,
    TextField,
    Autocomplete,
    Grid,
    Alert,
    Collapse,
    IconButton,
		FormGroup} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useForm, Controller } from "react-hook-form";
import { TextInput, PasswordInput } from "../../components/form"
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function Register() {
  const [values, setValues] = React.useState({
		passwordShow: false,
		reEnterPasswordShow: false,
		alertText: "",
		alertShow: false
});

	const { handleSubmit, control } = useForm();
	const navigate = useNavigate();

  const handleClickShowPassword = (event) => {
    let prop = event.currentTarget.id;
		console.log(prop)
      setValues({
      	...values,
      	[prop]: !values[prop]
  		});
			console.log(values[prop])
	}

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const registerHandler = (event) => {
			console.log(event)
    };

    const EmploymentStatusOptions = [
			{label:"permanent full-time", id: 1},
			{label:"temporary full-time", id: 2},
			{label:"part-time", id: 3}
		];
    
		// const EmploymentStatusOptions = ["permanent full-time", "temporary full-time", "part-time"];

	return (
		<>
		<div>
			<Grid container
				spacing={4}
				sx={{
					display: 'flex',
					justifyContent: 'center',
						}}>
				<Grid item xs={12} sm={10}>
					<Collapse in={alert.show}> 
						<Alert
						severity="error"
						variant='filled'
						onClose={() => {
							setValues({
								...values,
								alertText: "",
								alertShow: false
								})
						}}
						>{values.alertText}</Alert>
					</Collapse>
				</Grid>

        <Grid item xs={10} sm={6} md={4} sx={{margin: '10px'}}>
          <form onSubmit={handleSubmit(registerHandler)}>
						<h3 className="registerTitle">Personal Information</h3>      
						<TextInput
							name="firstName"
							control={control}
							label="First Name"
							size="small"
							rules={{ required: true }}
							icon={<PersonIcon />}/>

						<TextInput
							name="lastName"
							control={control}
							label="Last Name"
							size="small"
							rules={{ required: true }}
							icon={<PersonIcon />}/>

						<TextInput
							name="nationalCode"
							control={control}
							type="number"
							label="National Code"
							size="small"
							rules={{ required: true }}
							icon={<NumbersIcon />}/>

						<TextInput
							name="personnelCode"
							control={control}
							type="number"
							label="Personnel Code"
							size="small"
							rules={{ required: true }}
							icon={<NumbersIcon />}/>

						<Controller
							name="employmentStatus"
							control={control}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value, name, ref },
								fieldState: { isTouched, isDirty, error },
							}) => (
								<Autocomplete id="EmploymentStatus"
									// value={value}
									// onChaneg={onChange}
									clearOnEscape
									options={EmploymentStatusOptions}
									fullWidth
									renderInput={(params) => 
										<TextField {...params}
											onChaneg={onChange}
											value={value}
											inputRef={ref}
											label="Employment Status"
											error={Boolean(error)}
											size="small"
											margin="dense"/>
										}/>
							)}
						/>

						<h3 className="registerTitle">Login Information</h3>      
						<TextInput
							name="emailAddress"
							control={control}
							label="Email Address"
							size="small"
							rules={{
								required: true,
								pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
							}}
							icon={<EmailIcon />}/>

						<PasswordInput
							name="password"
							control={control}
							label="Password"
							size="small"
							rules={{required: true}}
							show={values.passwordShow}
							type={values.passwordShow ? 'text' : 'password'}
							handleClickShowPassword={handleClickShowPassword}/>

						<PasswordInput
							name="reEnterPassword"
							control={control}
							label="Re Enter Password"
							size="small"
							rules={{required: true}}
							show={values.reEnterPasswordShow}
							type={values.reEnterPasswordShow ? 'text' : 'password'}
							handleClickShowPassword={handleClickShowPassword}
						/>

						<h3 className="registerTitle">Contact Information</h3>      
						<TextInput
							name="homeAddress"
							control={control}
							label="Home Address"
							size="small"
							rules={{ required: true }}
							icon={<HomeIcon />}/>

						<TextInput
							name="phoneNumber"
							control={control}
							label="Phone Number"
							size="small"
							rules={{ required: true }}
							icon={<SmartphoneIcon />}/>

						<TextInput
							name="zipCode"
							control={control}
							label="Zip Code"
							size="small"
							rules={{ required: true }}
							icon={<MarkunreadMailboxIcon />}/>
						
            <h3 className="registerTitle">Photo Upload
							<span><IconButton color="dark" aria-label="upload picture" component="label">
									<input hidden accept="image/*" type="file" name="userPictureAddress" />
									<PhotoCamera />
							</IconButton></span></h3>        
							{/* UserPicture */}
							<div 
							sx={{ width: '100%',
										border: '1px dashed grey',
										// aspectRatio: 1
										}}>
									<img src=".\logo512.png"
									alt="user"
									width="100%"/>
							</div>
								<Button
									variant="outlined"
									component="label"
									endIcon={<AppRegistrationIcon  />}
									fullWidth
									sx={{	margin: '5px 0' }}
									color="success"
									>Register
									<input hidden type="submit"/>
							</Button>
							
							<div style={{margin: '5px 0'}}>
									<Link to="/">Login</Link>
							</div>

							<div style={{margin: '5px 0'}}>
							<Link to="/forgetPassword">Forget Password</Link>
							</div>
            </form>    
          </Grid>
        </Grid>
      </div>
    </>
  )
};

export default Register;