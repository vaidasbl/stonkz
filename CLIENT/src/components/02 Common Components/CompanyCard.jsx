import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
  if (Object.keys(data).length !== 0) {
    return (
      <div className="container">
        <div className="company-card mt-4">
          <div className="row mt-2 ">
            <div className="col-4 c1">Company name: </div>
            <div
              onClick={() => navigate(`/history/${data.ticker}`)}
              className="col-6 c2 cname"
            >
              {data.name}
            </div>
          </div>
          <hr className="hrhr1" />
          <div className="row">
            <div className="col-4 c1">Country: </div>
            <div className="col-6 c2">{data.country}</div>
          </div>
          <div className="row">
            <div className="col-4 c1">Currency: </div>
            <div className="col-6 c2">{data.currency}</div>
          </div>
          <div className="row mb-2">
            <div className="col-4 c1">Web URL: </div>
            <div className="col-6 c2">{data.weburl}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default CompanyCard;
