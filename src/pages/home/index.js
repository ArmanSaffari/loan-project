import { Link } from "react-router-dom";
import { Button, TextField, Grid } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';


function Home() {
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
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            id="outlined-basic"
                            label="User Name"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                margin: '20px'
                            }}
                            color="success"/>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            sx={{
                                width: '100%',
                                margin: '20px'
                            }}
                            color="success"/>
                        <Button
                            variant="outlined"
                            startIcon={<LoginOutlinedIcon />}
                            sx={{
                                width: '100%',
                                margin: '20px'
                            }}
                            color="success">Login</Button>
                        <div style={{margin: '20px'}}>
                            <Link to="/Register">Register</Link>
                        </div>
                        <div style={{margin: '20px'}}>
                            <Link to="/forgetPassword">Forget Password</Link>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
};

export default Home;