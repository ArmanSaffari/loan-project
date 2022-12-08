import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button,
    Grid,
    Alert,
    Collapse,
    IconButton} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useForm } from "react-hook-form";
import { TextInput, PasswordInput, SelectInput } from "../../components/form"
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function Register() {
  const [values, setValues] = useState({
		passwordShow: false,
		reEnterPasswordShow: false,
		alertText: "",
		alertShow: false,
		imgFile: null
});

	const { handleSubmit, control, getValues } = useForm();
	const navigate = useNavigate();

  const handleClickShowPassword = (event) => {
    let prop = event.currentTarget.id;
		console.log(prop)
      setValues({
      	...values,
      	[prop]: !values[prop]
  		});
	}

    const handleMouseDownPassword = (event) => { 
			event.preventDefault();
    };

    const registerHandler = async (event) => {
			const registerData = event;
			delete registerData.reEnterPassword;
			try {
				let formData = new FormData();
				formData.append('userData', JSON.stringify(registerData));
				formData.append('userPhoto', values.imgFile);

				const requestOptions = {
					method: 'POST',
				//	headers: { 'Content-Type': 'multipart/form-data' },
					body: formData
				}
				
			const response = await fetch('http://localhost:4000/api/user/registerWithPhoto', requestOptions)
			const responseObj = await response.json();	
			if (!response.ok) {throw responseObj.error}
			navigate("/dashboard", {
				state: { 
					message: responseObj.message,
					token: responseObj.token}
			});
			} catch (error) {
				console.log(error)
				setValues({
					...values,
					alertText: error.message,
					alertShow: true
				})
			}
		};

		const handleFileUpload = (event) => {
			setValues({
      	...values,
      	imgFile: event.target.files[0]
  		});
		};

	const EmploymentStatusOptions = ["permanent full-time", "temporary full-time", "part-time"];

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
					<Collapse in={values.alertShow}> 
						<Alert
						severity="error"
						variant="filled"
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

						<SelectInput
						control={control}
						name="employmentStatus"
						label="Employment Status"
						options={EmploymentStatusOptions}
						rules={{ required: true }}
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
							rules={{required: true,
								validate: {equalPasswords: value => value === getValues("password")}
							}}
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
									<input hidden accept="image/*" type="file" name="userPhotoFile" onChange={handleFileUpload} />
									<PhotoCamera />
							</IconButton></span></h3>        
							{/* UserPicture */}
							<div 
							sx={{ width: '100%',
										border: '1px dashed grey',
										}}>
									<img
									src={values.imgAddress}
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