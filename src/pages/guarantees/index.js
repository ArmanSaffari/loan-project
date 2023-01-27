import { Container } from "@mui/material";
import NavBar from "../../components/navbar";
import Typography from "@mui/material/Typography";
import GuaranteeRequests from "./GuaranteeRequests";
import GuaranteeHistory from "./GuaranteeHistory";

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
      
      <GuaranteeRequests />
      
      <GuaranteeHistory />

      </Container>
    </>
  )
  
};

export default Guarantees;
