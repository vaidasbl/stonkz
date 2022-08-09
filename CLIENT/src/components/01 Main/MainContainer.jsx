import React, { useState } from "react";
import CompanyCard from "../02 Common Components/CompanyCard";
import Dashboard from "../02 Common Components/Dashboard";
import DateInput from "../02 Common Components/DateInput";
import SearchInput from "../02 Common Components/SearchInput";

const MainContainer = () => {
  const [historyDateFrom, setHistoryDateFrom] = useState(null);
  const [historyDateTill, setHistoryDateTill] = useState(null);
  const [company, setCompany] = useState({});

  return (
    <Dashboard title={"Home"}>
      <div className="container ">
        <SearchInput
          setCompany={setCompany}
          company={company}
          historyDateFrom={historyDateFrom}
          historyDateTill={historyDateTill}
        />

        <div className="row mt-4">
          <div className="col-6">
            <DateInput
              label="History from"
              payload="historyFrom"
              setHistoryDate={setHistoryDateFrom}
              historyDate={historyDateFrom}
            />
          </div>
          <div className="col-6">
            <DateInput
              label="History till"
              payload="historyTill"
              setHistoryDate={setHistoryDateTill}
              historyDate={historyDateTill}
            />
          </div>
        </div>

        <CompanyCard data={company} />
      </div>
    </Dashboard>
  );
};

export default MainContainer;
