import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const appTheme = createTheme({
    palette: {
      mode: 'dark',
      success: {
        main: "#bfff00 ",
      }
    },
  });
  
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>Kish Non-Profit Financial Community</h1>
        </header>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}  />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
