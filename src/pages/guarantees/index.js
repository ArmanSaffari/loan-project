import { Container } from "@mui/material";
import NavBar from "../../components/navbar";
import Typography from "@mui/material/Typography";
import GuranteeRequests from "./GuranteeRequests";

const Guarantees = () => {

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography
          component="h3"
          my={3}
          sx={{fontWeight: 'bold'}}>
          Guarantees
        </Typography>
      
      <GuranteeRequests />
      
      </Container>
    </>
  )
  
};

export default Guarantees;
