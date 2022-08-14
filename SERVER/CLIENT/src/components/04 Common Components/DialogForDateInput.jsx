import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import DateInput from "./DateInput";
import { setGraphData } from "../05 Reducers/graphData";
import { useNavigate } from "react-router-dom";

const DialogForDateInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.companyData.value);
  const graphData = useSelector((state) => state.graphData.value);
  const [dateFrom, setDateFrom] = useState(graphData.dateFrom);
  const [dateTill, setDateTill] = useState(graphData.dateTill);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const empty = Object.values({ dateFrom: dateFrom, dateTill: dateTill }).some(
    (v) => v === "" || v === null
  );
  const handleSave = () => {
    dispatch(
      setGraphData({
        symbol: companyData.ticker,
        dateFrom: dateFrom,
        dateTill: dateTill,
        resolution: "D",
      })
    );
    navigate(`/stocks`);
  };
  return (
    <div>
      <div
        className="companytitle pt-3 pb-3"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onClick={handleClickOpen}
      >
        {hovered ? "See stocks" : companyData.name}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select date range</DialogTitle>
        <DialogContent>
          <div className="row mt-4">
            <div className="col-6">
              <DateInput
                label="History from"
                value={dateFrom}
                setDate={setDateFrom}
              />
            </div>
            <div className="col-6">
              <DateInput
                label="History till"
                value={dateTill}
                setDate={setDateTill}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            disabled={empty}
            onClick={handleSave}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogForDateInput;
