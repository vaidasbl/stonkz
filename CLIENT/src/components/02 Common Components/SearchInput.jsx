import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHistoryData } from "../04 Reducers/historyData";

const SearchInput = ({
  company,
  setCompany,
  historyDateFrom,
  historyDateTill,
}) => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const [validSearch, setValidSearch] = useState(true);

  const validate = (e) => {
    const searchString = e.target.value;
    const regex = /^[a-zA-Zą-ž\s\d-]+$/;
    if (searchString === "" || regex.test(searchString)) {
      setSearchString(searchString);
    } else {
      setValidSearch(false);
      setTimeout(() => setValidSearch(true), 1000);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/finnhub/company/${searchString}`
      );
      setCompany(response.data);
      dispatch(
        setHistoryData({
          symbol: response.data.ticker,
          dateFrom: historyDateFrom ? historyDateFrom : null,
          dateTill: historyDateTill ? historyDateTill : null,
        })
      );
    } catch (err) {
      setCompany({});
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
          style={validSearch ? {} : { border: "1px solid red" }}
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
