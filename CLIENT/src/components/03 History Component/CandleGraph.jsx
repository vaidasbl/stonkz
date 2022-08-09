import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const CandleGraph = ({ data }) => {
  var ohlc = [],
    volume = [],
    dataLength = data.length,
    groupingUnits = [
      ["week", [1]],
      ["month", [1, 2, 3, 4, 6]],
    ],
    i = 0;

  for (i; i < dataLength; i++) {
    ohlc.push([
      data[i][0], // the date
      data[i][1], // open
      data[i][2], // high
      data[i][3], // low
      data[i][4], // close
    ]);

    volume.push([
      data[i][0], // the date
      data[i][5], // the volume
    ]);
  }

  const options = {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: "AAPL Historical",
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
        height: "100%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
    ],

    series: [
      {
        type: "candlestick",
        name: "AAPL",
        data: [1, 1, 5, 6, 54, 5],
      },
    ],
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
};

export default CandleGraph;
