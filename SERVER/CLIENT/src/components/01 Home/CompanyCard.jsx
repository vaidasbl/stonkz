import React, { useState } from "react";
import { useSelector } from "react-redux";
import DialogForDateInput from "../04 Common Components/DialogForDateInput";

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
          <div className="card-title">
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
