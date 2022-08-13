import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyCard from "./CompanyCard";
import Dashboard from "../04 Common Components/Dashboard";
import TextInputField from "../04 Common Components/TextInputField";
import axios from "axios";
import { setCompanyData } from "../05 Reducers/companyData";
import Swal from "sweetalert2";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state.graphData.value);
  const [symbol, setSymbol] = useState(graphData.symbol);

  const handleSearchCompany = async () => {
    try {
      const result = await axios.post(
        `http://localhost:3002/api/finnhub/company`,
        { symbol: symbol }
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
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data || "Server error",
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {}, []);
  return (
    <Dashboard title="Home">
      <div className="d-flex flex-row align-center">
        <TextInputField
          label="Company symbol"
          value={symbol}
          setData={setSymbol}
          handleSubmit={handleSearchCompany}
        />

        <button type="button" className="myBtn2" onClick={handleSearchCompany}>
          Search
        </button>
      </div>

      <div className="card-container">
        <CompanyCard />
      </div>
    </Dashboard>
  );
};

export default HomeContainer;
