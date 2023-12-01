import React from 'react';
import dynamic from 'next/dynamic';

const DynamicApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = ({ options, series }) => {
  const isBrowser = typeof window !== 'undefined';

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
