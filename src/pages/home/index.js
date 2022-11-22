import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Grid } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Home() {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    
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
                    <Grid item xs={12} sm={6} md={4} sx={{margin: "50px 0"}}>
                        
                        <TextField
                            id="outlined-basic"
                            label="User Name"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                margin: '20px 0'
                            }}
                            color="success"/>
                        
                        <FormControl
                            sx={{ 
                                margin: '20px 0',
                                width: '100%'
                                }}
                            variant="outlined"
                            color="success">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
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
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        
                        <Button
                            variant="outlined"
                            startIcon={<LoginOutlinedIcon />}
                            sx={{
                                width: '100%',
                                height: '56px',
                                margin: '20px 0'
                            }}
                            color="success">Login</Button>
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