import { useState,  useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Alert, Collapse, Container } from "@mui/material";
import NavBar from "../../components/navbar";
import { getMySummary } from "api/user";
import DashboardCards from "./dashboradCards";
import createCards from "./createCards";

const Dashboard = () => {

  const [ userSummary, setUserSummary ] = useState({});
  const [ summaryCards, setSummaryCards ] = useState([]);

  const fetchMySummary = async () => {
    const { data } = await getMySummary();
    if (data.success == true) setUserSummary(data.value);
  };

  useEffect( () => {
    fetchMySummary()
    // setSummaryCards(createCards(userSummary));
  } , []);
  

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">

        <h3>Dashboard</h3>

        <DashboardCards cards={summaryCards}/>
        <img ></img>
      </Container>
      
    </>
  )
};

export default Dashboard;