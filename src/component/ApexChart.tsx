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

  console.log("isBrowserisBrowser" , isBrowser)
  console.log("process.env.NODE_ENV" , process.env.NODE_ENV)


  return (
    <div>
      {isBrowser &&
        (process.env.NODE_ENV !== "production" ? (
  <>
     {     console.log("in production")}
          <DynamicApexCharts
            options={options}
            series={series}
            type="candlestick"
            height={500}
          />
  </>
        ) : (
      <>
       {     console.log("in development")}
          <DynamicApexCharts
            options={options}
            series={series}
            type="candlestick"
            height={500}
          />
      </>
        ))}
    </div>
  );
};

export default ApexChart;
