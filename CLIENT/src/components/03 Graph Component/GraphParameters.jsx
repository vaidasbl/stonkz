import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateInput from "../01 Main/DateInput";
import ResolutionSelect from "../02 Common Components/ResolutionSelect";
import TextInputField from "../02 Common Components/TextInputField";

const GraphParameters = ({ getData }) => {
  const navigate = useNavigate();
  const graphData = useSelector((state) => state.graphData.value);
  console.log(graphData);

  return (
    <div className="parameters container">
      <hr className="hrhr1" />
      <div>Graph parameters</div>
      <div className="row mt-4">
        <div className="col-3">
          <TextInputField label="Company name" value={graphData.symbol} />
        </div>
        <div className="col-3 ">
          <ResolutionSelect />
        </div>
        <div className="col-3 ">
          <DateInput
            label="Date from"
            date={graphData.dateFrom}
            needDispatch={"true"}
            from={"true"}
          />
        </div>
        <div className="col-3 ">
          <DateInput
            label="Date till"
            date={graphData.dateTill}
            needDispatch={"true"}
            from={"false"}
          />
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
            type="button"
            onClick={() => getData()}
            className="myBtn1 mt-4"
          >
            {" "}
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphParameters;
