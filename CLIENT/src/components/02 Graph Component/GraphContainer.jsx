import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../04 Common Components/Dashboard";
import isEmpty from "../06 Functions/IsEmpty";
import Swal from "sweetalert2";
import { setStockData } from "../05 Reducers/stockData";
import CandleGraph from "./CandleGraph";
import GraphParameters from "./GraphParameters";
import apiEndpoint from "../../endpoint";

const GraphContainer = () => {
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state.graphData.value);
  const stockData = useSelector((state) => state.stockData.value);

  const graphParams = {
    symbol: graphData.symbol,
    resolution: graphData.resolution,
    dateFrom: new Date(graphData.dateFrom).getTime() / 1000,
    dateTill: new Date(graphData.dateTill).getTime() / 1000,
  };

  const getData = async () => {
    try {
      const result = await axios.post(
        `${apiEndpoint}/api/finnhub/company/stocks`,
        graphParams
      );
      dispatch(setStockData({ stocks: result.data }));
    } catch (err) {
      dispatch(setStockData({ stocks: {} }));
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data || "Server error",
        showConfirmButton: false,
      });
    }
  };
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getData();
    }
  }, [graphData]);
  return (
    <Dashboard
      title={
        graphData.symbol && !isEmpty(stockData.stocks)
          ? `Stock data of '${graphData.symbol.toUpperCase()}'`
          : ""
      }
    >
      {isEmpty(stockData.stocks) ? (
        <></>
      ) : (
        <CandleGraph data={stockData.stocks} symbol={graphData.symbol} />
      )}

      <GraphParameters getData={getData} />
    </Dashboard>
  );
};

export default GraphContainer;
