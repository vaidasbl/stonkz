import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../04 Common Components/Dashboard";
import isEmpty from "../06 Functions/IsEmpty";
import Swal from "sweetalert2";

import CandleGraph from "./CandleGraph";
import GraphParameters from "./GraphParameters";

const GraphContainer = () => {
  const graphData = useSelector((state) => state.graphData.value);
  const [stockData, setStockData] = useState({});
  const graphParams = {
    symbol: graphData.symbol,
    resolution: graphData.resolution,
    dateFrom: new Date(graphData.dateFrom).getTime() / 1000,
    dateTill: new Date(graphData.dateTill).getTime() / 1000,
  };

  const getData = async () => {
    try {
      const result = await axios.post(
        `http://localhost:3002/api/finnhub/company/stocks`,
        graphParams
      );
      setStockData(result.data);
    } catch (err) {
      setStockData({});
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data || "Server error",
        showConfirmButton: false,
      });
    }
  };

  return (
    <Dashboard
      title={
        graphData.symbol && !isEmpty(stockData)
          ? `Stock data of '${graphData.symbol.toUpperCase()}'`
          : ""
      }
    >
      {isEmpty(stockData) ? (
        <></>
      ) : (
        <CandleGraph data={stockData} symbol={graphData.symbol} />
      )}

      <GraphParameters getData={getData} />
    </Dashboard>
  );
};

export default GraphContainer;
