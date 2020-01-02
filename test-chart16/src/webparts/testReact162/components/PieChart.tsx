import * as React from "react";
import { Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {IColor} from "../IColor"


const pieChart = (props) => {
    const dataObj = {
      labels: ["Red", "Green", "Yellow"],
      datasets: [
        {
          // data: [300, 50, 100],
          // data: props.data.chartData,
          data: props.data.map(a => a.chartData),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    let options: ChartOptions = {
      legend: {
        position: "bottom"
      }
    };

    return <Pie data={dataObj} options={options} />;
    

}

export default pieChart;


