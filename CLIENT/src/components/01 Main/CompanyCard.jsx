import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogForDateInput from "../02 Common Components/DialogForDateInput";

const CompanyCard = () => {
  const companyData = useSelector((state) => state.companyData.value);
  const [hovered, setHovered] = useState(false);

  const openHomepage = () => {
    window.open(companyData.weburl, "_blank");
  };

  if (!Object.values(companyData).some((k) => k === "" || k === undefined)) {
    return (
      <div className="cardbody">
        <div className="card-upper">
          <div className="cname">
            <DialogForDateInput />
          </div>
        </div>
        <div className="card-image-container">
          <img
            className="card-image"
            src={companyData.img !== "" && companyData.img}
            alt={""}
          ></img>
        </div>

        <div className="card-lower">
          <div className="card-lower-text">
            <div className="row">
              <div className="col-6">
                {companyData.country}
                <div className="underline-text">Country</div>
              </div>
              <div className="col-6">
                {companyData.currency}
                <div className="underline-text">Currency</div>
              </div>
            </div>
            <div className="weburl-row">
              <div
                className="weburl-button"
                onMouseOver={() => setHovered(true)}
                onMouseOut={() => setHovered(false)}
                onClick={() => openHomepage()}
              >
                {hovered ? companyData.weburl : "Visit"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CompanyCard;

/* <div className="company-card mt-4">
        <div className="row mt-2 ">
          <div className="col-4 c1">Company name: </div>
          <div className="col-6 c2 cname">
            <DialogForDateInput />
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
        <img className="cardimg" src={companyData.img} alt="" />
      </div> */
