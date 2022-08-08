import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const HistoryContainer = () => {
  const [historyData, setHistoryData] = useState({});
  const { symbol } = useParams();
  const [historyParams, setHistoryParams] = useState({
    resolution: "D",
    from: 11111111,
    to: 222222222,
  });
  console.log(symbol);

  const getHistory = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/finnhub/symbol=${symbol}/resolution=${historyParams.resolution}/from=${historyParams.from}/to=${historyParams.to}`
      );
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <div>HistoryContainer</div>
      <div>{symbol}</div>
    </div>
  );
};

export default HistoryContainer;
