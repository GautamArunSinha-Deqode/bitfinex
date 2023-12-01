import React from 'react'
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ options, series }) => {
    return (
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={500}
        />
      );
}

export default ApexChart