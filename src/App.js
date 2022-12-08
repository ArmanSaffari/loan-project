import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

function App() {
  return (
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
  );
}

export default App;
