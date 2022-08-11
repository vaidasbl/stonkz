import axios from "axios";
import React, { useEffect, useState } from "react";
import Dashboard from "../02 Common Components/Dashboard";
import DialogForStockData from "../02 Common Components/DialogForStockData";
import Pagination from "../02 Common Components/Pagination";

const LogContainer = () => {
  const [logSize, setLogSize] = useState(0);
  const [page, setPage] = useState(1);
  const [log, setLog] = useState([]);
  const pageSize = 10;

  const numOfPages = Math.ceil(logSize / pageSize);

  const getLogPage = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/finnhub/log/p=${page}/s=${pageSize}`
      );
      setLog(result.data.page);
      setLogSize(result.data.size);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getLogPage();
  }, [page]);
  return (
    <Dashboard>
      <div className="logcontainer container">
        <div className="row">
          <div className="col-2">Company</div>
          <div className="col-5">Date range</div>
          <div className="col-2">Stock data</div>
          <div className="col-3">Search date</div>
        </div>
        <hr />
        {log.map((entry) => (
          <div className="row logentry" key={entry._id}>
            <div className="col-2 ">{entry.company}</div>
            <div className="col-5">{entry.dateRange}</div>
            <div className="col-2">
              {entry.stockData.s === "ok" ? (
                <DialogForStockData
                  data={entry.stockData}
                  symbol={entry.company}
                />
              ) : (
                <div className="nodataentry">no data</div>
              )}
            </div>
            <div className="col-3">{entry.eventDate}</div>
          </div>
        ))}
      </div>

      {numOfPages > 1 ? (
        <div className="pagination-container">
          {" "}
          <Pagination numOfPages={numOfPages} setPage={setPage} />
        </div>
      ) : (
        <></>
      )}
    </Dashboard>
  );
};

export default LogContainer;
