import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Alert, Collapse } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { login } from "api/user";

import { TextInput, PasswordInput } from "components/form";

function LogIn() {
  const [values, setValues] = useState({
    username: {},
    password: {},
    showPassword: false,
    alertText: "",
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
      console.log(data);
      navigate("/dashboard", { state: { message: data.message } });
    } catch (error) {
      const {
        response: { data },
      } = error;
      console.log(data.error.message);
      setValues({
        ...values,
        alertText: data.error.message,
        alertShow: true,
      });
      console.error(error);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Grid item xs={12} sm={10}>
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

        <Grid item xs={10} sm={6} md={4} lg={3} sx={{ margin: "10px" }}>
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
              variant="contained"
              endIcon={<LoginIcon />}
              fullWidth
              sx={{ height: "56px", margin: "10px 0" }}
              color="success"
              type="submit"
            >
              Login
            </Button>

            <div style={{ margin: "20px 0", color: "success" }}>
              <Link to="/Register">Register</Link>
            </div>

            <div style={{ margin: "20px 0" }}>
              <Link to="/forgetPassword">Forget Password</Link>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default LogIn;
