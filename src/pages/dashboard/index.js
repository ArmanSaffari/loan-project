import { useState,  useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Alert, Collapse } from "@mui/material";
import NavBar from "../../components/navbar";

const Dashboard = () => {

  // const [ values, setValues ] = useState({
  // alertText: "",
  // alertShow: false,
  // alertSeverity: "success"
  // })

  // const location = useLocation();

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     alertText: location.state.message,
  //     alertShow: true
  //   })
  // }, [location]);
 
  
  
  return (
    <>
      {/* <Collapse in={values.alertShow}> 
        <Alert
        severity={values.alertSeverity}
        variant="filled"
        onClose={() => {
          setValues({
            ...values,
            alertText: "",
            alertShow: false
            })
          }}
        >{values.alertText}</Alert>
      </Collapse> */}
      <NavBar />
      <h3>Dashboard</h3>
    </>
  )
};

export default Dashboard;