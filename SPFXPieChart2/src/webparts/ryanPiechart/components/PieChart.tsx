import * as React from "react";
import { Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

//? FUNCTIONAL COMPONENT. BUT CANT USE .JS TAG
const PieChart = props => {
  const dataObj = {
    labels: props.data.map(a => a.title),
    datasets: [
      {
        /*
        ? Can use RGBA format for colors as well.
        ? e.g: => backgroundColor: 'rgba(255,99,132,0.2)'
        */

        label: "Process Distribution",
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgba(0, 255, 0, 0.4)",
          "rgba(134, 136, 138, 0.60)"
        ],
        hoverBackgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgba(0, 255, 0, 0.4)",
          "rgba(134, 136, 138, 0.60)"
        ],
        data: props.data.map(a => a.chartData)
      }
    ]
  };

  let options: ChartOptions = {
    title: {
      display: true,
      text: "Process Completion (%)",
      fontSize: 18
    },
    legend: {
      position: "bottom"
    }
  };

  return <Pie data={dataObj} options={options} />;
};

export default PieChart;
