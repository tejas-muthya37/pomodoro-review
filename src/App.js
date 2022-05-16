import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Screens/Homepage/Homepage";
import Task from "./Screens/Task/Task";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/task/:taskId" element={<Task />} />
      </Routes>
    </Router>
  );
}

export default App;
