import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeContainer from "./components/01 Home/HomeContainer";
import GraphContainer from "./components/02 Graph Component/GraphContainer";
import LogContainer from "./components/03 Log/LogContainer";

import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/stocks" element={<GraphContainer />} />
        <Route path="/log" element={<LogContainer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
