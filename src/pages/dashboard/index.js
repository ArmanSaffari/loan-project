import { useState,  useEffect, useLayoutEffect} from "react";
import { Container, ThemeProvider, Grid } from "@mui/material";
import NavBar from "../../components/navbar";
import { getMySummary, tokenCheck } from "api/user";
import DashboardCards from "./dashboradCards";
import createCards from "./createCards";
import { dashboardTheme } from 'components/theme';

const Dashboard = () => {
  
  const [ userSummary, setUserSummary ] = useState({});
  const [ summaryCards, setSummaryCards ] = useState([]);

  const fetchMySummary = async () => {
    const { data } = await getMySummary();
    if (data.success == true) {
      setUserSummary(data.value);
      setSummaryCards(createCards(data.value))
    }
  };

  useEffect( () => {
    fetchMySummary()
  } , []);

  return (
    <>
      <ThemeProvider theme={dashboardTheme}>
        
        <Container maxWidth={false} className="dashboardContainer">
          
          <NavBar />

            <Container maxWidth="lg" >

              <h3 className="header">Dashboard</h3>

              <DashboardCards cards={summaryCards}/>
              
          </Container>

        </Container>

      </ThemeProvider>
    </>
  )
};

export default Dashboard;