import { useState,  useEffect, useLayoutEffect} from "react";
import { Container, ThemeProvider } from "@mui/material";
import { getMemFee, } from "api/memFee";
import { dashboardTheme } from 'components/theme';

import NavBar from "../../components/navbar";
import CurrentMemFee from "./CurrentMemFee";
import RequestToIncrease from "./RequestToIncrease";
import MemFeeHistory from "./MemFeeHistory";
import MemFeePaymentHistory from "./MemFeePaymentHistory";

const Membership = () => {

  const [lastMemFee, setLastMemFee] = useState();

  const fetchLastMemFee = async () => {
    const { data } = await getMemFee();
    if (data.success == true) setLastMemFee(data);
  };

  useLayoutEffect(() => { 
    fetchLastMemFee();
  }, []);
    
  return (
    <>
      <ThemeProvider theme={dashboardTheme}>

        <Container maxWidth={false} className="dashboardContainer">
          
          <NavBar />

          <Container maxWidth="lg">

            <h3 className="header">Membership Status</h3>

            <CurrentMemFee lastMemFee={lastMemFee}/>

            <RequestToIncrease lastMemFee={lastMemFee}/>

            <MemFeeHistory />

            <MemFeePaymentHistory />
          
            </Container>

        </Container>

      </ThemeProvider>
    </>
  )
  
};

export default Membership;