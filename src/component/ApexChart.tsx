import React from 'react';
import dynamic from 'next/dynamic';
// import ReactApexChart from 'react-apexcharts';
const DynamicApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexChartContract {
  options:any;
  series:any[];

}

const ApexChart:React.FC<ApexChartContract> = ({ options, series }) => {
  const isBrowser = typeof window !== 'undefined';
console.log("optionsoptionsoptions", options)
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
