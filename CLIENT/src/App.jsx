import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContainer from "./components/01 Main/MainContainer";
import GraphContainer from "./components/03 Graph Component/GraphContainer";

import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/history/:symbol" element={<GraphContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
