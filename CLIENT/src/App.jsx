import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContainer from "./components/01 Home/MainContainer";
import HistoryContainer from "./components/03 History Component/HistoryContainer";

import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/history/:symbol" element={<HistoryContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
