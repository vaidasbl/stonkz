import React, { useState } from "react";
import { useSelector } from "react-redux";
import CompanyCard from "./CompanyCard";
import Dashboard from "../02 Common Components/Dashboard";
import DateInput from "./DateInput";
import SearchInput from "./SearchInput";

const MainContainer = () => {
  const graphData = useSelector((state) => state.graphData.value);
  const [graphDateFrom, setGraphDateFrom] = useState(null);
  const [graphDateTill, setGraphDateTill] = useState(null);

  return (
    <Dashboard title={"Home"}>
      <div className="container ">
        <SearchInput
          graphDateFrom={graphDateFrom?.toLocaleDateString("en-US")}
          graphDateTill={graphDateTill?.toLocaleDateString("en-US")}
        />

        <div className="row mt-4">
          <div className="col-6">
            <DateInput
              label="History from"
              setDate={setGraphDateFrom}
              date={graphDateFrom}
            />
          </div>
          <div className="col-6">
            <DateInput
              label="History till"
              setDate={setGraphDateTill}
              date={graphDateTill}
            />
          </div>
          <div>{Date.now()}</div>
          <div>{new Date(graphData.dateTill).toLocaleDateString("en-US")}</div>
        </div>

        <CompanyCard />
      </div>
    </Dashboard>
  );
};

export default MainContainer;
