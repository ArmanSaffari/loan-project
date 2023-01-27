import { useState,  useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Alert, Collapse } from "@mui/material";
import NavBar from "../../components/navbar";
import { getMySummary } from "api/user";

const Dashboard = () => {

  const fetchMySummary = async () => {
    const { data } = await getMySummary();
    if (data.success == true) setUserSummary(data.value);
  };

  const summaryHandler = () => {
    fetchMySummary();
  };
 
  
  
  return (
    <>
      <NavBar />
      <h3>Dashboard</h3>
    </>
  )
};

export default Dashboard;