"use client";

import React, { useEffect, useState } from "react";
import { fetchApiData } from "@/APIS/api";
import ApexChart from "./ApexChart";
import WebSocketFunc from "./WebSocketFunc";
import { candelStickOptions } from "@/constant/CandelStickConstant";
import Loader from "./Loader";
// import Link from 'next/link';

const OHLCChart = () => {
  const [ohlcData, setOHLCData] = useState<any[]>([]);

  useEffect(() => {
    const handleWebSocketData = (data: any) => {
      setTimeout(() => {
        setOHLCData(data);
      }, 2000);
    };
    WebSocketFunc({ onDataReceived: handleWebSocketData });
    const getResponse = async (): Promise<void> => {
      const getData = await fetchApiData();
      const candlestickData: any = [
        {
          name: "candlesticks",
          data: getData?.map((dataPoint) => ({
            x: dataPoint.timestamp,
            y: [dataPoint.open, dataPoint.high, dataPoint.low, dataPoint.close],
          })),
        },
      ];
      setTimeout(() => {
        setOHLCData(candlestickData);
      }, 2000);
    };
    getResponse();
  }, []);

  // console.log("dfjkjdf")
  const handleClick = () => {
    window.location.href = "/OrderBookPage";
  };

  return (
    <div>
      {/* <Link href="/OrderBookPage" >Order Book </Link > */}
      {/* property 'data' does not exist on type never */}
      {ohlcData[0]?.data?.length > 0 ? (
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
