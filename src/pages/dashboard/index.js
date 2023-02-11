import { useState,  useEffect, useLayoutEffect} from "react";
import { Container } from "@mui/material";
import NavBar from "../../components/navbar";
import { getMySummary, tokenCheck } from "api/user";
import DashboardCards from "./dashboradCards";
import createCards from "./createCards";

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