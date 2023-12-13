import { ApexChartContract } from "@/component/ChartComponent/@type";
import React from "react";
import { DynamicApexCharts } from "./chart";

const ApexChart: React.FC<ApexChartContract> = ({ options, series }) => {
  const isBrowser = typeof window !== "undefined";

  return (
    <div>
      {isBrowser && (
        <DynamicApexCharts
          options={options}
          series={series}
          type="candlestick"
          height={500}
        />
      )}
    </div>
  );
};

export default ApexChart;
