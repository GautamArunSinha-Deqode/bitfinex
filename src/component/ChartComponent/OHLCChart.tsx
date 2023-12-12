"use client";

import React, { useEffect, useRef, useState } from "react";
import ApexChart from "./ApexChart";
import { candelStickOptions } from "@/constant/CandelStickConstant";
import Loader from "../LoadersComponent/Loader";
import handleSocketConnection from "./ChartSocketConnection";

const OHLCChart = () => {
  const [ohlcData, setOHLCData] = useState<any[]>([]);
  const ws: any = useRef(null);
  useEffect(() => {
    ws.current = handleSocketConnection(setOHLCData);
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [ohlcData]);

  const handleClick = () => {
    window.location.href = "/OrderBookPage";
  };
  console.log("ohlcData  ohlcData ohlcData", ohlcData);
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
