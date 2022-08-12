import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyCard from "./CompanyCard";
import Dashboard from "../02 Common Components/Dashboard";
import TextInputField from "../02 Common Components/TextInputField";
import axios from "axios";
import { setCompanyData } from "../04 Reducers/companyData";

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

  useEffect(() => {}, []);
  return (
    <Dashboard title="Home">
      <div className="row ">
        <div className="col-6 align-right">
          <TextInputField
            label="Company name"
            value={symbol}
            setData={setSymbol}
            handleSubmit={handleSearchCompany}
          />
        </div>

        <div className="col-6 align-left">
          <button
            type="button"
            className="myBtn2"
            onClick={handleSearchCompany}
          >
            Search
          </button>
        </div>
      </div>
      <div className="card-container">
        <CompanyCard />
      </div>
    </Dashboard>
  );
};

export default MainContainer;
