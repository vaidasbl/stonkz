import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCompanyData } from "../04 Reducers/companyData";
import { setGraphData } from "../04 Reducers/graphData";

const SearchInput = ({ graphDateFrom, graphDateTill }) => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const [validInput, setValidInput] = useState(true);

  const validate = (e) => {
    const searchString = e.target.value;
    const regex = /^[a-zA-Zą-ž\s\d-]+$/;
    if (searchString === "" || regex.test(searchString)) {
      setSearchString(searchString);
    } else {
      setValidInput(false);
      setTimeout(() => setValidInput(true), 1000);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/finnhub/company/${searchString}`
      );
      dispatch(
        setCompanyData({
          name: result.data.name,
          country: result.data.country,
          currency: result.data.currency,
          weburl: result.data.weburl,
          ticker: result.data.ticker,
        })
      );
      dispatch(
        setGraphData({
          symbol: result.data.ticker,
          dateFrom: graphDateFrom,
          dateTill: graphDateTill,
          resolution: "30",
        })
      );
      console.log(result.data);
    } catch (err) {
      dispatch(setCompanyData({}));
      alert(err.message);
    }
  };

  return (
    <div className="row mt-4 ">
      <div className="col-6 align-right ">
        <input
          type="text"
          className="searchfield"
          onChange={validate}
          value={searchString}
          style={validInput ? {} : { border: "1px solid red" }}
        ></input>
      </div>
      <div className="col-6 align-left">
        {" "}
        <button type="button" className="myBtn1" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
