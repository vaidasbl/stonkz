import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../01 Main/Navbar";

const Dashboard = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <div className="background">
      <div className="">
        <Navbar />
        <div className="main-container">
          <div className="mt-4">{title}</div>
          <div className="main-container-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
