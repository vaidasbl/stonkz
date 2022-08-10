import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextInputField from "../02 Common Components/TextInputField";
import { setCompanyData } from "../04 Reducers/companyData";
import { setGraphData } from "../04 Reducers/graphData";
import { validate } from "../05 Functions/ValidatorLettersAndSpace";

const SearchInput = ({ graphDateFrom, graphDateTill }) => {
  const dispatch = useDispatch();
  const [inputString, setInputString] = useState("");

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/finnhub/company/${inputString}`
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
        <TextInputField
          label="Company name"
          value={inputString}
          setData={setInputString}
        />
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

{
  /* <*/
}
