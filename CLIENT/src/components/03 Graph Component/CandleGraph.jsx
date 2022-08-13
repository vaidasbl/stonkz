import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import axios from "axios";

const CandleGraph = ({ data, symbol }) => {
  let ohlc = [],
    volume = [],
    groupingUnits = [
      ["week", [1, 2, 3]],
      ["month", [1, 2, 3, 4, 6]],
    ];

  if (data.s === "ok") {
    for (let i = 0; i < data.o.length; i++) {
      ohlc.push([
        data["t"][i] * 1000, // the date
        data["o"][i], // open
        data["h"][i], // high
        data["l"][i], // low
        data["c"][i], // close
      ]);

      volume.push([data["t"][i] * 1000, data["v"][i]]);
    }
  }
  const options = {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: "",
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "OHLC",
        },
        height: "85%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Volume",
        },
        top: "85%",
        height: "15%",
        outerWidth: "100%",
        offset: 0,
        lineWidth: 1,
      },
    ],
    tooltip: {
      split: true,
    },

    series: [
      {
        type: "candlestick",
        name: symbol,
        data: ohlc,
        dataGrouping: {
          units: groupingUnits,
        },
      },
      {
        type: "column",
        name: "Volume",
        data: volume,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits,
        },
      },
    ],
  };
  return (
    <div className="">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
      <hr />
    </div>
  );
};

export default CandleGraph;
