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
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [logInAlert, setLogInAlert] = React.useState({
        text: "",
        show: false
    })
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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

    const logInHandler = () => {
        /*
        1. send inputed data to the server (API??)
        2. on server error --> show the feedback
        3. on valid username and password
            --> route to "/myProfile"
            --> send data of the user to myProfile
        
        */
        setLogInAlert(() => {
            return {
                text: "username and password don't match!",
                show: true
            }
        });
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
                        
                        <TextField
                            id="username-input"
                            label="username"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                margin: '20px 0',
                            }}
                            color="success"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><AccountCircleIcon /></InputAdornment>,
                              }}
                            />

                        <FormControl
                            sx={{ 
                                margin: '20px 0',
                                width: '100%'
                                }}
                            variant="outlined"
                            color="success">
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
                            endIcon={<LoginIcon  />}
                            sx={{
                                width: '100%',
                                height: '56px',
                                margin: '20px 0',
                            }}
                            color="success"
                            onClick={logInHandler}>
                        Login</Button>
                        <div style={{margin: '20px 0'}}>
                            <Link to="/Register">Register</Link>
                        </div>
                        <div style={{margin: '20px 0'}}>
                            <Link to="/forgetPassword">Forget Password</Link>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
};

export default Home;