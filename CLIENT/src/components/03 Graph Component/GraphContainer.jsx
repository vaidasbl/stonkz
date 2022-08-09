import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../02 Common Components/Dashboard";
import CandleGraph from "./CandleGraph";

const HistoryContainer = () => {
  const graphData = useSelector((state) => state.graphData.value);

  const [data, setData] = useState([]);
  const [parameters, setParameters] = useState({ symbol: graphData.symbol });

  const graphParams = {
    symbol: graphData.symbol,
    resolution: "60",
    dateFrom: new Date(graphData.dateFrom).getTime() / 1000,
    dateTill: new Date(graphData.dateTill).getTime() / 1000,
  };

  const getData = async () => {
    try {
      const result = await axios.post(
        `http://localhost:3002/api/finnhub/company/history`,
        graphParams
      );
      setData(result.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Dashboard title={`Stock graph of ${graphData.symbol}`}>
      <CandleGraph data={data} parameters={parameters} />
      <div className="parameters container">
        <div>title</div>
        <div className="row">
          <div className="col-3">
            <input className="myInput" placeholder="company name"></input>
          </div>
          <div className="col-3 redborder">2</div>
          <div className="col-3 redborder">3</div>
          <div className="col-3 redborder">4</div>
        </div>
      </div>
    </Dashboard>
  );
};

export default HistoryContainer;
