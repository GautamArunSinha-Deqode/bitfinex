"use client";

import { candelStickOptions } from "@/constant/CandelStickConstant";
import React from "react";
import Loader from "../LoadersComponent/Loader";
import ApexChart from "./ApexChart";
import useSocketConnection from "./useSocketConnection";

const OHLCChart = () => {
  const { ohlcData } = useSocketConnection();
  const handleClick = () => {
    window.location.href = "/OrderBookPage";
  };
  return (
    <div>
      {ohlcData[0]?.data?.length > 0 && ohlcData[0]?.data[0]?.x ? (
        <>
          <button onClick={handleClick} style={{ marginBottom: "5px" }}>
            Order Book
          </button>
          <ApexChart options={candelStickOptions} series={ohlcData} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default OHLCChart;
