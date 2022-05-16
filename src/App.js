import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Screens/Homepage/Homepage";
import Task from "./Screens/Task/Task";
import Empty from "./Components/Empty/Empty";
import notFound from "./Media/404-page-not-found.png";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/task/:taskId" element={<Task />} />
        <Route
          path="*"
          element={<Empty pageNotFound={true} emptyImage={notFound} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
