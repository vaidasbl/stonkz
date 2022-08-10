import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateInput from "../02 Common Components/DateInput";
import ResolutionSelect from "../02 Common Components/ResolutionSelect";
import TextInputField from "../02 Common Components/TextInputField";
import { setGraphData } from "../04 Reducers/graphData";

const GraphParameters = ({ getData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state.graphData.value);

  const [symbol, setSymbol] = useState(graphData.symbol);
  const [resolution, setResolution] = useState(graphData.resolution);
  const [dateFrom, setDateFrom] = useState(graphData.dateFrom);
  const [dateTill, setDateTill] = useState(graphData.dateTill);

  const empty = Object.values({
    symbol: symbol,
    resolution: resolution,
    dateFrom: dateFrom,
    dateTill: dateTill,
  }).some((v) => v === null || v === "");

  const handleRefreshGraph = () => {
    dispatch(
      setGraphData({
        ...graphData,
        symbol: symbol,
        resolution: resolution,
        dateFrom: dateFrom,
        dateTill: dateTill,
      })
    );
  };
  useEffect(() => {
    getData();
  }, [graphData]);

  return (
    <div className="parameters container">
      <hr className="hrhr1" />
      <div>Graph parameters</div>
      <div className="row mt-4">
        <div className="col-3">
          <TextInputField
            label="Company name"
            value={symbol}
            setData={setSymbol}
          />
        </div>
        <div className="col-3 redborder">
          <ResolutionSelect value={resolution} setResolution={setResolution} />
        </div>
        <div className="col-3">
          <DateInput label="Date from" value={dateFrom} setDate={setDateFrom} />
        </div>
        <div className="col-3 ">
          <DateInput label="Date till" value={dateTill} setDate={setDateTill} />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="myBtn1 mt-4"
          >
            {" "}
            Go back
          </button>
        </div>
        <div className="col-6">
          {" "}
          <button
            disabled={empty}
            type="button"
            onClick={() => handleRefreshGraph()}
            className="myBtn1 mt-4"
          >
            {" "}
            Search
          </button>
          <div className="warningmsg">
            {empty ? "Fill in the parameters" : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphParameters;
