import React from "react";
import Navbar from "../01 Home/Navbar";

const Dashboard = ({ children, title }) => {
  return (
    <div className="background">
      <div className="">
        <Navbar />
        <div className="dashboard-container">
          <div className="dashboard-title">{title}</div>
          <div className="dashboard-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
