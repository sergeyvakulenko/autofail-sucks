import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TPlotValue } from "~/5-entities/PlotValue";
import { Tooltip as CustomTooltip } from ".";

const Graph: React.FC<{ data: Array<TPlotValue> }> = ({ data }) => {
  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      style={{ marginLeft: "-32px", marginTop: "30px", marginBottom: "30px" }}
    >
      <Line type="monotone" dataKey="probability" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="diff" />
      <YAxis dataKey="probability" />
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  );
};

export { Graph };
