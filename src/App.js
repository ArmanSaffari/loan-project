import { Routes, Route } from "react-router-dom";
// import LogIn from "./pages/login";
// import Register from "./pages/register";
// import Dashboard from "./pages/dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { purple } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import routes from "routes/routes";
import theme from 'components/theme';

function App() {
  const appTheme = createTheme({
    palette: {
      // mode: 'light',
      // success: {
      //   light: '#E8C45F',
      //   main: '#E8C45F',
      //   dark: '#E8C45F',
      //   contrastText: 'rgba(0, 0, 0, 0.87)',
      //   }
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.title}
            path={route.path}
            element={<route.element />}
          >
            {route.childes.map((child) => (
              <Route
                key={child.title}
                path={child.path}
                element={<child.element />}
              />
            ))}
          </Route>
        ))}
        {/* <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
