// import OHLCChart from "@/component/OHLCChart";
import OHLCChart from "@/component/ChartComponent/OHLCChart";
import Head from "next/head";
import React from "react";

const page = () => {
  return (
    <main>
      <Head>
        <title>OHCL Chart</title>
      </Head>
      <OHLCChart />
    </main>
  );
};

export default page;
