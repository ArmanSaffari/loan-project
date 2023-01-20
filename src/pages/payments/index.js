import { Container } from "@mui/material";
import NavBar from "../../components/navbar";
import Typography from '@mui/material/Typography';
import PaymentHistory from "./paymentHistory";
import WaitingPayment from "./waitingPayment";
import AddPaymentForm from "./addPaymentForm";
import DuePayemnts from "./duePayments";

const Payments = () => {

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Typography
          component="h3"
          my={3}
          sx={{fontWeight: 'bold'}}>
          Payments
        </Typography>

        <DuePayemnts />

        <AddPaymentForm />

        <WaitingPayment />

        <PaymentHistory />
        
      </Container>
    </>
  )
  
};

export default Payments;