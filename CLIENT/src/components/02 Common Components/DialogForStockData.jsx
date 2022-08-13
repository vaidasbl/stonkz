import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CandleGraph from "../03 Graph Component/CandleGraph";

export default function DialogForStockData({ data, symbol }) {
  const [graph, setGraph] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <div className="stocksButton" onClick={handleClickOpen("paper")}>
        Open
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            component="span"
          >
            {graph ? (
              <CandleGraph data={data} symbol={symbol} />
            ) : (
              <div>
                <div className="row">
                  <div className="col-2">Timestamp</div>
                  <div className="col-2">High</div>
                  <div className="col-2">Low</div>
                  <div className="col-2">Close</div>
                  <div className="col-2">Open</div>
                  <div className="col-2">Volume</div>
                </div>
                <hr />

                {data.s === "ok" ? (
                  <div className="row">
                    <div className="col-2">
                      {data.t.map((t, i) => (
                        <div key={i}>
                          {new Date(t * 1000).toLocaleDateString("en-US")}
                        </div>
                      ))}
                    </div>

                    <div className="col-2">
                      {data.h.map((h, i) => (
                        <div key={i}>{h}</div>
                      ))}
                    </div>
                    <div className="col-2">
                      {data.l.map((l, i) => (
                        <div key={i}> {l}</div>
                      ))}
                    </div>
                    <div className="col-2">
                      {data.c.map((c, i) => (
                        <div key={i}>{c}</div>
                      ))}
                    </div>

                    <div className="col-2">
                      {data.o.map((o, i) => (
                        <div key={i}>{o}</div>
                      ))}
                    </div>
                    <div className="col-2">
                      {data.v.map((v, i) => (
                        <div key={i}>{v}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button onClick={() => setGraph(!graph)}>
            {graph ? "See data" : "See in graph"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
