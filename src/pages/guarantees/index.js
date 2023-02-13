import { useState,  useEffect, useLayoutEffect} from "react";
import { Container, ThemeProvider } from "@mui/material";
import { dashboardTheme } from 'components/theme';

import NavBar from "../../components/navbar";
import Typography from "@mui/material/Typography";
import GuaranteeRequests from "./GuaranteeRequests";
import GuaranteeHistory from "./GuaranteeHistory";

const Guarantees = () => {

  return (
    <>
      <ThemeProvider theme={dashboardTheme}>

        <Container maxWidth={false} className="dashboardContainer">
          
          <NavBar />
          
          <Container maxWidth="lg">

          <h3 className="header">Guarantees</h3>
                        
          <GuaranteeRequests />
          
          <GuaranteeHistory />

        </Container>

        </Container>

      </ThemeProvider>
    </>
  )
  
};

export default Guarantees;
