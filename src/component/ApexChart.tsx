import React from "react";
import {DynamicApexCharts} from './chartComponent'
interface ApexChartContract {
  options: any;
  series: any[];
}

const ApexChart: React.FC<ApexChartContract> = ({ options, series }) => {
  const isBrowser = typeof window !== "undefined";

  console.log("typeof window", typeof window)
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
