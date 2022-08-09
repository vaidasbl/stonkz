import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyCard = () => {
  const companyData = useSelector((state) => state.companyData.value);
  const navigate = useNavigate();

  if (!Object.values(companyData).some((k) => k === "" || k === undefined)) {
    return (
      <div className="company-card mt-4">
        <div className="row mt-2 ">
          <div className="col-4 c1">Company name: </div>
          <div
            onClick={() => navigate(`/history/${companyData.ticker}`)}
            className="col-6 c2 cname"
          >
            {companyData.name}
          </div>
        </div>
        <hr className="hrhr1" />
        <div className="row">
          <div className="col-4 c1">Country: </div>
          <div className="col-6 c2">{companyData.country}</div>
        </div>
        <div className="row">
          <div className="col-4 c1">Currency: </div>
          <div className="col-6 c2">{companyData.currency}</div>
        </div>
        <div className="row mb-2">
          <div className="col-4 c1">Web URL: </div>
          <div className="col-6 c2">{companyData.weburl}</div>
        </div>
      </div>
    );
  }
};

export default CompanyCard;
