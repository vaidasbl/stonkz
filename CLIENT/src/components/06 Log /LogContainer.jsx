import axios from "axios";
import React, { useState } from "react";
import Dashboard from "../02 Common Components/Dashboard";

const LogContainer = () => {
  const [log, setLog] = useState([]);

  const getLog = async () => {
    try {
      const result = axios.get("http://localhost:3002/api/finnhub/log");
    } catch (err) {
      alert(err);
    }
  };
  return <Dashboard title="Log">123</Dashboard>;
};

export default LogContainer;
