import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeContainer from "./components/01 Home/HomeContainer";

import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
