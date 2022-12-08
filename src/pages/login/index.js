import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button,
	Grid,
	Alert,
	Collapse} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useForm } from "react-hook-form";
import { TextInput, PasswordInput } from "../../components/form"

function LogIn() {
  const [values, setValues] = React.useState({
    username: {},
		password: {},
		showPassword: false,
		alertText: "",
		alertshow: false
    });
	
  const { handleSubmit, control } = useForm();
	const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setValues({
    	...values,
      showPassword: !values.showPassword
      });
  };

	const logInHandler = async (event) => {
		setValues({
			...values,
			alertText: "",
			alertShow: false
		})
		
		try {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(event)
			}
		const response = await fetch('http://localhost:4000/api/user/signin', requestOptions)
		const responseObj = await response.json();	
		if (!response.ok) {throw responseObj.error}
		navigate("/dashboard", {
			state:{
				message: responseObj.message,
				token: responseObj.token
			}
		});
			// token: responseObj.token}})
		} catch (error) {
				console.log(error)
			setValues({
				...values,
				alertText: error,
				alertShow: true
			})
		}
		}

	return (
		<>
			<Grid container
				spacing={0}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					margin: 'auto'
				}}>
				<Grid item xs={12} sm={10}>
					<Collapse in={values.alertShow}> 
						<Alert
						severity="error"
						variant='filled'
						onClose={() => {
							setValues({
								...values,
								alertText: "",
								alertShow: false
							});
								}}
								>{values.alertText}</Alert>
						</Collapse>
				</Grid>

				<Grid item xs={10} sm={6} md={4} lg={3} sx={{margin: "10px"}}>
					<form onSubmit={handleSubmit(logInHandler)}>
						<TextInput
							name="emailAddress"
							control={control}
							label="Email"
							rules={{ required: true }}
							icon={<AccountCircleIcon />}/>

						<PasswordInput
							name="password"
							control={control}
							label="password"
							rules={{required: true}}
							show={values.showPassword}
							type={values.showPassword ? 'text' : 'password'}
							handleClickShowPassword={handleClickShowPassword}
							/>
						
						<Button
							variant="outlined"
							component="label"
							endIcon={<LoginIcon  />}
							fullWidth
							sx={{	height: '56px', margin: '10px 0'}}
							color="success"
							> Login <input hidden type="submit"/>
						</Button>

						<div style={{margin: '20px 0'}}>
								<Link to="/Register">Register</Link>
						</div>

						<div style={{margin: '20px 0'}}>
						<Link to="/forgetPassword">Forget Password</Link>
						</div>

					</form>
			</Grid>
		</Grid>
	</>
	)
};

export default LogIn;

