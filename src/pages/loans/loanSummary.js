import { useState,  useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMySummary } from "api/user";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Box, Divider } from "@mui/material";

const LoanSummary = () => {
  const [userSummary, setUserSummary] = useState();

  const [numberOfLoans, setNumberOfLoans] = useState([]);

const fetchMySummary = async () => {
  const { data } = await getMySummary();
  if (data.success == true) {
    setUserSummary(data.value);
    setNumberOfLoans(
      Object.entries(data.value.numberOfLoans)
    );
  }
};

const summaryHandler = () => {
  fetchMySummary();
};
  
  const loanTypes =["normal", "urgent"];
  const colors = {
    total: "#34D8EB", requested: "#E8C4A9", canceled: "",
    rejected: "#E6413E", active: "#60E79E", terminated: "gray"
}
  const LoanSummaryCard = (props) => {

    return(
      <Card  raised> 
      {/* sx={{ width: 200 }} */}
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day asdadasadsdad
        </Typography>
      </CardContent>
    </Card>
    )
  }

  return(
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: 'gray',
          borderBottom: '1px solid gray'
        }}
        onClick={summaryHandler}
      >
        <Typography sx={{fontWeight: 'bold'}}>Loan Summary</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container sx={{display: "flex"}} spacing={2}>
          {loanTypes.map((loanType) => {
            return (
              <Grid item xs={12} sm={6}>
                <Card raised> 
                  <CardContent>
  
                    <Typography 
                      sx={{ fontWeight: "bold" }}
                      textAlign={"center"}>
                      {`${(loanType).charAt(0).toUpperCase()}${(loanType).slice(1)} Loan(s)`}
                    </Typography>
                    
                      {numberOfLoans.map((row) => {
                        return (row[1][loanType] == 0 || row[0] == "canceled") ? "" : (
                          <>
                            <Grid container sx={{display: "flex", justifyContent: "space-between"}}>
                              
                              <Typography sx={{ fontSize: 14}} mt={0.1}>
                                {`${(row[0].toUpperCase())} `}
                              </Typography>

                              <Box ml={1}
                                sx={{ 
                                  backgroundColor: colors[row[0]],
                                  minWidth: "15px",
                                  border: "1pt solid grey",
                                  borderRadius: '4px',
                                  width: `${parseInt(row[1][loanType])*50/parseInt(numberOfLoans[0][1][loanType])}%`
                                  }}>
                                <Typography textAlign={"center"} sx={{ fontSize: 14}}>
                                  { row[1][loanType] }
                                </Typography>
                              </Box>
                            </Grid>

                            <Divider variant="fullWidth" />
                          </>
                        )
                      })}
                    
                  </CardContent>
                </Card>
              </Grid>
            )
          })
          }
          
        </Grid>
        


        {/* <Typography>
          {"Due membership Fees need to be paide: "}
          <strong style={{color: 'crimson'}}>
            {(userSummary) ?`${Math.max(0, userSummary.memFeeRemained)}$` : "..."}
          </strong>
        </Typography>
        <Typography>
          {"Due installments need to be paid: "}
          <strong style={{color: 'crimson'}}>
            {(userSummary) ? `${Math.max(0, userSummary.installmentRemained)}$` : "..."}
          </strong>
        </Typography> */}
      </AccordionDetails>
    </Accordion>
  )
};

export default LoanSummary;