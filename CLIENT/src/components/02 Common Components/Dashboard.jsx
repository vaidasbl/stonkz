import React from "react";

const Dashboard = ({ children, title, footer }) => {
  return (
    <div className="background">
      <div className="main-container">
        <div className="main-container-title">{title}</div>
        <div className="main-container-body">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
