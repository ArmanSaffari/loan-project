import { Container } from "@mui/material";
import NavBar from "../../components/navbar";
import Typography from '@mui/material/Typography';
import LoanSummary from "./loanSummary";
import LoanRequest from "./loanRequest";
import LoanHistory from "./loanHistory";
import WaitingLoanRequests from "./waitingLoanRequests";

const Loans = () => {

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography
          component="h3"
          my={3}
          sx={{fontWeight: 'bold'}}>
          Loans
        </Typography>
       
        <LoanSummary />

        <LoanRequest />

        <WaitingLoanRequests />
        
        <LoanHistory />

      </Container>
    </>
  )
  
};

export default Loans;