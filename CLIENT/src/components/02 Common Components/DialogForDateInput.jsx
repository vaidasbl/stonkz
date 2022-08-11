import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import DateInput from "./DateInput";
import { setGraphData } from "../04 Reducers/graphData";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DialogForDateInput() {
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
        className="companytitle"
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={empty} onClick={handleSave}>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
