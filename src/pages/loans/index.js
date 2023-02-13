import { useState,  useEffect, useLayoutEffect} from "react";
import { Container, ThemeProvider } from "@mui/material";
import { dashboardTheme } from 'components/theme';

import NavBar from "../../components/navbar";
import Typography from '@mui/material/Typography';
import LoanSummary from "./loanSummary";
import LoanRequest from "./loanRequest";
import LoanHistory from "./loanHistory";
import WaitingLoanRequests from "./waitingLoanRequests";

const Loans = () => {

  return (
    <>
      <ThemeProvider theme={dashboardTheme}>

        <Container maxWidth={false} className="dashboardContainer">

          <NavBar />

          <Container maxWidth="lg">

          <h3 className="header">Loans</h3>
        
          <LoanSummary />

          <LoanRequest />

          <WaitingLoanRequests />
          
          <LoanHistory />

          </Container>

        </Container>

      </ThemeProvider>

    </>
  )
  
};

export default Loans;