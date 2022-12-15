import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const appTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
