import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../02 Common Components/Dashboard";
import CandleGraph from "./CandleGraph";

const HistoryContainer = () => {
  const historyData = useSelector((state) => state.historyData.value);
  const [stockData, setStockData] = useState({});

  const unixifyDate = (date) => {
    return new Date(date).getTime() / 1000;
  };

  const historyParams = {
    symbol: historyData.symbol,
    resolution: "D",
    dateFrom: unixifyDate(historyData.dateFrom),
    dateTill: unixifyDate(historyData.dateTill),
  };

  const getHistory = async () => {
    try {
      const result = await axios.post(
        `http://localhost:3002/api/finnhub/company/history`,
        historyParams
      );
      setStockData(result.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Dashboard title={`Stock graph of ${historyData.symbol}`}>
      <CandleGraph data={stockData} />
    </Dashboard>
  );
};

export default HistoryContainer;
