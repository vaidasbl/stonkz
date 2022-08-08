import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyCard from "../02 Common Components/CompanyCard";
import DateInput from "../02 Common Components/DateInput";
import SearchInput from "../02 Common Components/SearchInput";

const MainContainer = () => {
  const historyDate = useSelector((state) => state.historyDate.value);
  const [response, setResponse] = useState({});
  console.log(historyDate);

  const unix = new Date(historyDate.historyFrom).getTime();
  return (
    <div className="main-container">
      <SearchInput setResponse={setResponse} />
      <div className="container">
        <div className="row mt-4">
          <div className="col-6">
            <DateInput label="History from" payload="historyFrom" />
          </div>
          <div className="col-6">
            <DateInput label="History till" payload="historyTill" />
          </div>
          <div>{unix || null}</div>
        </div>
      </div>

      <CompanyCard data={response} />
    </div>
  );
};

export default MainContainer;
