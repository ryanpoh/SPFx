import * as React from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

//? FUNCTIONAL COMPONENT. BUT CANT USE .JS TAG
const LineChart = props => {
  const dataObj = {
    /*
    ? Can use RGBA format for colors as well.
    ? e.g: => backgroundColor: 'rgba(255,99,132,0.2)'
    */
    labels: props.data.map(a => a.title),
    datasets: [
      {
        label: "Faulty (pcs.)",
        backgroundColor: "rgbA(47,60,126, 0.8)",
        borderColor: "rgbA(47,60,126, 0.8)",
        data: props.data.map(a => a.faultData)
      },
      {
        label: "Quantity (pcs.)",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: props.data.map(a => a.chartData)
      }
    ]
  };

  let options: ChartOptions = {
    title: {
      display: true,
      text: "Production Volume (000' pcs.)",
      fontSize: 18
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return <Line data={dataObj} options={options} />;
};

export default LineChart;
