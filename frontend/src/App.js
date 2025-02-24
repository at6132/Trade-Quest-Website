import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home"; // Assuming you have a homepage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
