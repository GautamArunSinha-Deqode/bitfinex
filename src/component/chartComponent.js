import dynamic from "next/dynamic";
import ReactApexChart from "react-apexcharts";

const DynamicApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export { DynamicApexCharts, ReactApexChart };
