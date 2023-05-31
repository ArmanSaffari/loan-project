import { Link } from "react-router-dom";
import { loginTheme } from "components/theme";
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Grid, Button, Container, ButtonBase } from "@mui/material";
import logo from "logos/Kish Financial Institution-darkGray.svg";

const Home = () => {
  return (
    
    <>
      <ThemeProvider theme={loginTheme}>

      <Container
        maxWidth="lg"
        className="mainFormContainer"
        >
        <Grid container>
          <Grid item 
            className="homeLogoGrid"
            xs={12}>
              <img
                alt="Kish Financial Institute Logo"
                width="300px"
                src={logo} />
          </Grid>
          <Grid item
            xs={11} sm={8} md={5}
            className="homeDescriptionGrid"
            >
            <Typography varient="h6">
              Welcome to our non-profit financial institute!
              We are committed to providing access to financial resources and services to individuals and families who may not have access to traditional financial institutions.
              Our organization is dedicated to improving financial literacy and empowering our community with the knowledge and tools necessary to make informed financial decisions.
              We believe that everyone deserves the opportunity to achieve financial stability, regardless of their socio-economic background or financial history.
              Our team of financial experts is passionate about helping others and works tirelessly to ensure that our clients receive the best possible support and guidance.
            </Typography>
          </Grid>

          <Grid item xs={12}
            className="homeButtonContainer">
            <Button href="/Login" > Log in </Button>
          </Grid>

          <Grid item xs={12}
            className="homeButtonContainer">
            <Button href="/Register"> Register </Button>
          </Grid>

        </Grid>
      </Container>
      </ThemeProvider>
    </>
  );
};

export default Home;
