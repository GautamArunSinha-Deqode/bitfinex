import React from "react";
import { DynamicApexCharts, ReactApexChart } from "./chartComponent"; 

interface ApexChartContract {
  options: any;
  series: any[];
}

const ApexChart: React.FC<ApexChartContract> = ({ options, series }) => {
  const isBrowser = typeof window !== "undefined";
  const ChartComponent = process.env.NODE_ENV !== "production" ? ReactApexChart : DynamicApexCharts;
console.log("ChartComponent",ChartComponent)
  return (
    <div>
      {isBrowser && ChartComponent && (
        <ChartComponent
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
