import React from "react";
import dynamic from "next/dynamic";
import ReactApexChart from "react-apexcharts";
const DynamicApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ApexChartContract {
  options: any;
  series: any[];
}

const ApexChart: React.FC<ApexChartContract> = ({ options, series }) => {
  const isBrowser = typeof window !== "undefined";
  return (
    <div>
      {isBrowser &&
        (process.env.NODE_ENV === "production" ? (
          <DynamicApexCharts
            options={options}
            series={series}
            type="candlestick"
            height={500}
          />
        ) : (
          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={500}
          />
        ))}
    </div>
  );
};

export default ApexChart;
