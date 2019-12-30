import * as React from "react";
import { Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = {
      labels: ["Red", "Green", "Yellow"],
      datasets: [
        {
          data: [300, 50, 100],
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

    return <Pie data={data} options={options} />;
  }
}
