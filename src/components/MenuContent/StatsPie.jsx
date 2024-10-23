import React from "react";
import { PieChart, Pie, Cell } from "recharts";


const COLORS = ["rgb(2,230,3)", "rgb(230,2,2)", "#000000"];

export default function StatsPie({ data1, data2, data3 }) {
  const data = [
    { name: "Win Ratio", value: parseInt(data1) },
    { name: "Loss Ratio", value: parseInt(data2) },
    { name: "Remaining", value: parseInt(data3) }
  ];

  return (
    <PieChart width={300} height={250}>
      <Pie
        data={data}
        cx={140}
        cy={130}
        innerRadius={30}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
