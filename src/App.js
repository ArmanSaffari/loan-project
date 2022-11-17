import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Loan Project</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
