import { enviornment } from "@/constant/AllConstant";
import dynamic from "next/dynamic";
import ReactApexChart from "react-apexcharts";
let DynamicApexCharts: any = null;

if (process.env.NODE_ENV !== enviornment.production) {
  DynamicApexCharts = ReactApexChart;
} else {
  DynamicApexCharts = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });
}

export { DynamicApexCharts };
