import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Alert, Collapse, Container } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { login } from "api/user";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from '@mui/material';
import { TextInput, PasswordInput } from "components/form";
import { loginTheme } from "components/theme";

function LogIn() {
  const [values, setValues] = useState({
    username: {},
    password: {},
    showPassword: false,
    alertText: "sdfsdf",
    alertShow: false,
  });

  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const logInHandler = async (event) => {
    try {
      const { data } = await login(event);
      localStorage.setItem("token", data.token);
      if (data.isAdmin) localStorage.setItem("isAdmin", true);
      navigate("/dashboard", { state: { message: data.message } });
    } catch (error) {
      const {
        response: { data },
      } = error;
      console.log(data);

      console.log(data.err.message);
      setValues({
        ...values,
        alertText: data.err.message,
        alertShow: true,
      });
      console.error(error);
    }
  };

  return (
    <>
    
      <ThemeProvider theme={loginTheme}>
        <Container
          maxWidth="lg"
          className="mainFormContainer"
          >
          <Grid container>

            <Grid item
              xs={12}
              className='gradientLoginGrid'>

              <Grid item xs={12}
                className="loginAlert">
                  
                <Collapse in={values.alertShow}>
                  <Alert
                    severity="error"
                    variant="filled"
                    onClose={() => {
                      setValues({
                        ...values,
                        alertText: "",
                        alertShow: false,
                      });
                    }}
                  >
                    {values.alertText}
                  </Alert>
                </Collapse>
              </Grid>

              <form onSubmit={handleSubmit(logInHandler)}>

                <TextInput
                  name="emailAddress"
                  control={control}
                  label="Email"
                  rules={{ required: true }}
                  icon={<AccountCircleIcon />}
                />
                
                <PasswordInput
                  name="password"
                  control={control}
                  label="password"
                  rules={{ required: true }}
                  show={values.showPassword}
                  type={values.showPassword ? "text" : "password"}
                  handleClickShowPassword={handleClickShowPassword}
                />

                <Button
                  variant="outlined"
                  // endIcon={<LoginIcon />}
                  fullWidth
                  // sx={{ height: "56px", margin: "10px 0" }}
                  // color="success"
                  type="submit"
                >
                  Login
                </Button>

                <div 
                // className="links"
                style={{ margin: "20px 0"}}
                >
                  <Link href="/Register">Register</Link>
                </div>

                <div 
                style={{ margin: "20px 0" }}
                >
                  <Link href="/forgetPassword">Forget Password</Link>
                </div>
              </form>
            </Grid>
       
            <Grid item 
            className="loginLogoGrid"
            xs={12}>
              <img
                alt="Kish Financial Institute Logo"
                width="300px"
                src="./logos/Kish Financial Institution-darkGray.svg"></img>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default LogIn;
