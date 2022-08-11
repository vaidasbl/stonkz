import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyCard from "./CompanyCard";
import Dashboard from "../02 Common Components/Dashboard";
import DateInput from "../02 Common Components/DateInput";
import TextInputField from "../02 Common Components/TextInputField";
import axios from "axios";
import { setCompanyData } from "../04 Reducers/companyData";
import { setGraphData } from "../04 Reducers/graphData";

const MainContainer = () => {
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state.graphData.value);
  const [symbol, setSymbol] = useState(graphData.symbol);

  const handleSearchCompany = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/finnhub/company/${symbol}`
      );
      dispatch(
        setCompanyData({
          name: result.data.name,
          country: result.data.country,
          currency: result.data.currency,
          weburl: result.data.weburl,
          ticker: result.data.ticker,
          img: result.data.logo,
        })
      );
    } catch (err) {
      dispatch(setCompanyData({}));
      alert(err.message);
    }
  };

  return (
    <Dashboard title="Home">
      <div className="row ">
        <div className="col-6 align-left">
          <TextInputField
            label="Company name"
            value={symbol}
            setData={setSymbol}
          />
        </div>
        <div className="col-6">
          <button onClick={handleSearchCompany} className="myBtn2">
            Search
          </button>
        </div>
      </div>

      <CompanyCard />
    </Dashboard>
  );
};

export default MainContainer;
