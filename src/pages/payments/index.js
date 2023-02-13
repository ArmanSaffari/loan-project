import { useState,  useEffect, useLayoutEffect} from "react";
import { Container, ThemeProvider } from "@mui/material";
import { dashboardTheme } from 'components/theme';

import NavBar from "../../components/navbar";
import PaymentHistory from "./paymentHistory";
import WaitingPayment from "./waitingPayment";
import AddPaymentForm from "./addPaymentForm";
import DuePayemnts from "./duePayments";

const Payments = () => {

  return (
    <>
      <ThemeProvider theme={dashboardTheme}>

        <Container maxWidth={false} className="dashboardContainer">

          <NavBar />

          <Container maxWidth="lg">

            <h3 className="header">Payments</h3>

            <DuePayemnts />

            <AddPaymentForm />

            <WaitingPayment />

            <PaymentHistory />

          </Container>

        </Container>

      </ThemeProvider>
    </>
  )
  
};

export default Payments;