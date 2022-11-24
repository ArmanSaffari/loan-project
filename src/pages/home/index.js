import React from "react";
import { Link } from "react-router-dom";
import { Button,
    TextField,
    Grid,
    Alert,
    Collapse,
    IconButton,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Home() {
    const [values, setValues] = React.useState({
        username: '',
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [isValid, setIsValid] = React.useState({
        username: true,
        password: true
    })

    const [logInAlert, setLogInAlert] = React.useState({
        text: "",
        show: false
    })
    
    const regEx = {
        username: new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}/),
        password: new RegExp()
    }

    const handleValidation = (prop) => {
        setIsValid({
            ...isValid,
            [prop]: regEx[prop].test(values[prop])
        });
        console.log(values[prop]);
        console.log(isValid[prop]);
    };

    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
        handleValidation(prop);
    };
    
    const handleClickShowPassword = () => {
      setValues({
      ...values,
      showPassword: !values.showPassword,
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const logInHandler = (event) => {
        /*
        1. send inputed data to the server (API??)
        2. on server error --> show the feedback
        3. on valid username and password
            --> route to "/myProfile"
            --> send data of the user to myProfile
        
        */
        event.preventDefault();
        setLogInAlert(() => {
            return {
                text: "username and password don't match!",
                show: true
            }
        });
        setTimeout(()=> {
            setLogInAlert(() => {
            return {
                ...logInAlert,
                show: false
            }
        })}, 5000);

        console.log(values)
    }

    return (
        <>
            <div>
                <Grid container
                    spacing={0}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: 'auto'
                    }}>
                    <Grid item xs={12} sm={10}>
                        <Collapse in={logInAlert.show}> 
                            <Alert
                            severity="error"
                            variant='filled'
                            onClose={() => {
                                setLogInAlert({
                                    ...logInAlert,
                                    show: false
                                });
                            }}
                            >{logInAlert.text}</Alert>
                        </Collapse>
                    </Grid>
    
                    <Grid item xs={10} sm={6} md={4} lg={3} sx={{margin: "10px"}}>
                        <form action="asdasd" method="GET">      
                            <TextField
                                focused
                                id="username-input"
                                label="username"
                                variant="outlined"
                                onChange={handleChange('username')}
                                sx={{
                                    width: '100%',
                                    margin: '20px 0',
                                }}
                                color={isValid.username ? "success" : "error"}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><AccountCircleIcon /></InputAdornment>,
                                }}
                            />
                            <FormControl
                                focused
                                sx={{ 
                                    margin: '20px 0',
                                    width: '100%'
                                    }}
                                variant="outlined"
                                color={isValid.password ? "success" : "error"}>
                                <InputLabel htmlFor="password-input">password</InputLabel>
                                <OutlinedInput
                                    id="password-input"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            
                            <Button
                                variant="outlined"
                                component="label"
                                endIcon={<LoginIcon  />}
                                sx={{
                                    width: '100%',
                                    height: '56px',
                                    margin: '20px 0',
                                }}
                                color="success"
                                >
                                Login
                                <input hidden type="submit"
                                onClick={logInHandler}/>
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
            </div>
        </>
    )
};

export default Home;