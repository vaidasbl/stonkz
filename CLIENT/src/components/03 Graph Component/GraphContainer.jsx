import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../02 Common Components/Dashboard";
import Swal from "sweetalert2";

import CandleGraph from "./CandleGraph";
import GraphParameters from "./GraphParameters";

const GraphContainer = () => {
  const graphData = useSelector((state) => state.graphData.value);
  const [stockData, setStockData] = useState([]);

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
      setStockData(result.data);
      if (result.data.s === "no_data") {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `No data found for company '${graphParams.symbol}'`,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data || err,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Dashboard
      title={
        graphData.symbol
          ? `Stock data of '${graphData.symbol}'`
          : "Enter the company name"
      }
    >
      <CandleGraph data={stockData} symbol={graphData.symbol} />
      <GraphParameters getData={getData} />
    </Dashboard>
  );
};

export default GraphContainer;
