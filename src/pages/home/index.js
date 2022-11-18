import { Link } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';


function Home() {
    return (
        <>
            <div className="loginForm">
                <form>
                    <TextField id="outlined-basic" label="User Name" variant="outlined" />
                    <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" />
                    <Button variant="outlined" startIcon={<LoginOutlinedIcon />}>Login</Button>
                    <Link to="/Register">Register</Link>
                    <Link to="/forgetPassword">Forget Password</Link>
                </form>
            </div>
        </>
    )
};

export default Home;