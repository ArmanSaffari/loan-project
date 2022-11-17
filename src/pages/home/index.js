import { Link } from "react-router-dom";
import { Button } from '@mui/material';


function Home() {
    return (
        <>
            <h3>Log in Form</h3>
            <Button variant="contained" color="primary"><Link to="/register">Register Here!</Link></Button>
        </>
    )
};

export default Home;