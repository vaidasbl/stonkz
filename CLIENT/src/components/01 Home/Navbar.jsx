import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <div className="navibar">
      <div className="row">
        <div
          className={
            location === "/" ? "col-3 navitem-active" : "col-3 navitem"
          }
          onClick={() => navigate("/")}
        >
          Home
        </div>
        <div
          className={
            location === "/stocks" ? "col-3 navitem-active" : "col-3 navitem"
          }
          onClick={() => navigate("/stocks")}
        >
          Stocks
        </div>
        <div
          className={
            location === "/log" ? "col-3 navitem-active" : "col-3 navitem"
          }
          onClick={() => navigate("/log")}
        >
          Log
        </div>
      </div>
    </div>
  );
};

export default Navbar;
