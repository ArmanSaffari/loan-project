import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button,
    Grid,
    Alert,
    Collapse,
    IconButton,
		ThemeProvider,
		Container,
		Link,
		Typography} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useForm } from "react-hook-form";
import { TextInput, PasswordInput, SelectInput } from "../../components/form"
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import { loginTheme } from 'components/theme';
import { register, login } from 'api/user';

function Register() {
  const [values, setValues] = useState({
		passwordShow: false,
		reEnterPasswordShow: false,
		imgFile: null,
		imgPath: "icons/personIcon-lightGray.svg"
	});
	const [alert, setAlert] = useState({
		show: false,
		text: "",
		severity: "error"
	})

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
			
			// using axios to send HTTP request:
    	const { data } = await register(formData);

			if (data.success) {
				const response = await login({
					emailAddress: event.emailAddress,
					password: event.password
				});
				const loginData = response.data;
				localStorage.setItem("token", loginData.token);
				if (loginData.isAdmin) localStorage.setItem("isAdmin", true);
				navigate("/dashboard", { state: { message: loginData.message } });
			} else {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
				throw data.err
			}

			} catch (err) {
				setAlert({
					text: err.message,
					show: true,
					severity: "error"
				})
			}
		};

		const handleFileUpload = (event) => {
			setValues({
      	...values,
      	imgFile: event.target.files[0],
				imgPath: URL.createObjectURL(event.target.files[0])
  		});
		};

	const EmploymentStatusOptions = [
		{value: "permanent full-time", label: "permanent full-time"},
		{value: "temporary full-time", label: "temporary full-time"},
		{value: "part-time", label: "part-time"}
	];

	return (
		<>
		<ThemeProvider theme={loginTheme}>
			<Container
				maxWidth="lg"
				className="mainRegisterContainer"
				>

			<Grid container>

        <Grid item xs={12} className='opaqueRegisterGrid'>
					
					<Grid item 
					className="loginAlert"
					xs={12}>
						<Collapse in={alert.show}> 
							<Alert
							severity={alert.severity}
							variant="filled"
							onClose={() => {
								setAlert({
									...alert,
									text: "",
									show: false
									})
							}}
							>{alert.text}</Alert>
						</Collapse>
					</Grid>

          <form onSubmit={handleSubmit(registerHandler)}>
						<Typography>Register</Typography>
						<h3 className="registerTitle">Personal Information</h3>      

						<TextInput
							name="firstName"
							control={control}
							label="First Name"
							rules={{ required: true}}
							icon={<PersonIcon />}/>

						<TextInput
							name="lastName"
							control={control}
							label="Last Name"
							rules={{ required: true }}
							icon={<PersonIcon />}/>

						<TextInput
							name="nationalCode"
							control={control}
							type="number"
							label="National Code"
							
							rules={{ required: true }}
							icon={<NumbersIcon />}/>

						<TextInput
							name="personnelCode"
							control={control}
							type="number"
							label="Personnel Code"
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
							
							rules={{
								required: true,
								pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
							}}
							icon={<EmailIcon />}/>

						<PasswordInput
							name="password"
							control={control}
							label="Password"
							rules={{required: true}}
							show={values.passwordShow}
							type={values.passwordShow ? 'text' : 'password'}
							handleClickShowPassword={handleClickShowPassword}/>

						<PasswordInput
							name="reEnterPassword"
							control={control}
							label="Re Enter Password"
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
							rules={{ required: true }}
							icon={<HomeIcon />}/>

						<TextInput
							name="phoneNumber"
							control={control}
							label="Phone Number"
							rules={{ required: true }}
							icon={<SmartphoneIcon />}/>

						<TextInput
							name="zipCode"
							control={control}
							label="Zip Code"
							rules={{ required: true }}
							icon={<MarkunreadMailboxIcon />}/>
						
            <h3 className="registerTitle">Photo Upload
							<span><IconButton color="dark" aria-label="upload picture" component="label">
									<input hidden accept="image/*" type="file" name="userPhotoFile" onChange={handleFileUpload} />
									<PhotoCamera color="success"/>
							</IconButton></span></h3>        
							{/* UserPicture */}
							<div 
							sx={{ width: '100%',
										border: '1px dashed grey',
										}}>
									<img
									src={values.imgPath}
									alt="user"
									width="100%"/>
							</div>
								<Button
									variant="outlined"
									component="label"
									fullWidth
									>Register
									<input hidden type="submit"/>
							 </Button>
							
							<div style={{margin: '5px 0'}}>
									<Link href="/login">Login</Link>
							</div>

							<div style={{margin: '5px 0'}}>
							<Link href="/forgetPassword">Forget Password</Link>
							</div>
            </form>    
          </Grid>
        </Grid>

				</Container>
			</ThemeProvider>
    </>
  )
};

export default Register;