import axios from "axios";
import React, { useEffect, useState } from "react";
import Dashboard from "../04 Common Components/Dashboard";
import DialogForStockData from "../04 Common Components/DialogForStockData";
import Pagination from "../04 Common Components/Pagination";
import TextInputForFiltering from "../04 Common Components/TextInputForFiltering";
import Swal from "sweetalert2";
import apiEndpoint from "../../endpoint";

const LogContainer = () => {
  const [logSize, setLogSize] = useState(0);
  const [page, setPage] = useState(1);
  const [log, setLog] = useState([]);
  const pageSize = 10;
  const [filterString, setFilterString] = useState("");

  const numOfPages = Math.ceil(logSize / pageSize);

  const getLogPage = async () => {
    try {
      const result = await axios.post(`${apiEndpoint}/api/finnhub/log/filter`, {
        page: page,
        size: pageSize,
        filter: filterString,
      });
      setLog(result.data.page);
      setLogSize(result.data.size);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data || "Server error",
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    getLogPage();
  }, [page, filterString]);

  console.log(log);

  return (
    <Dashboard title={"Log"}>
      {log.length !== 0 ? (
        <div>
          <div className="logcontainer container">
            <div className="align-left mb-4">
              <TextInputForFiltering
                label="Filter company or date"
                setFilterString={setFilterString}
                filterString={filterString}
              />
            </div>
            <div className="row logcolumns">
              <div className="col-2">Company</div>
              <div className="col-5">Date range</div>
              <div className="col-2">Stock data</div>
              <div className="col-3">Search date</div>
            </div>
            <hr />
            {log.map((entry) => (
              <div className="row logentry" key={entry._id}>
                <div className="col-2">{entry.company}</div>
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

          {numOfPages > 1 && (
            <div className="pagination-container">
              {" "}
              <Pagination numOfPages={numOfPages} setPage={setPage} />
            </div>
          )}
        </div>
      ) : (
        <div>Log is empty</div>
      )}
    </Dashboard>
  );
};

export default LogContainer;
