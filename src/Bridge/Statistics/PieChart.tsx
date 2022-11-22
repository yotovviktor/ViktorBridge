import React from "react";
import { Chart } from "react-google-charts";
import { PieChartProps } from "../../model";

const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
  // const data = [
  //   ["", "Points"],
  //   ["N-S", 21],
  //   ["E-W", 19],
  // ];

  // const options = {
  //   title: "My Daily Activities",
  // };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"600px"}
    />
  );
}

export default PieChart
