import { Container } from "@mui/material";
import NavBar from "../../components/navbar";
import Typography from '@mui/material/Typography';
import PaymentHistory from "./paymentHistory";
import WaitingPayment from "./WaitingPayment";
import AddPaymentForm from "./AddPaymentForm";
import DuePayemnts from "./DuePayments";

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