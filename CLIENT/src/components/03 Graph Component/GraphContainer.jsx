import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DateInput from "../01 Main/DateInput";
import Dashboard from "../02 Common Components/Dashboard";
import ResolutionSelect from "../02 Common Components/ResolutionSelect";
import TextInputField from "../02 Common Components/TextInputField";
import CandleGraph from "./CandleGraph";
import GraphParameters from "./GraphParameters";

const HistoryContainer = () => {
  const graphData = useSelector((state) => state.graphData.value);
  const [stockData, setData] = useState([]);

  const graphParams = {
    symbol: graphData.symbol,
    resolution: graphData.resolution,
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
      <CandleGraph data={stockData} symbol={graphData.symbol} />
      <GraphParameters getData={getData} />
    </Dashboard>
  );
};

export default HistoryContainer;
