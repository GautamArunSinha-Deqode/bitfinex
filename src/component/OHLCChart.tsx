"use client";

import React, { useEffect, useState } from "react";
import { fetchApiData } from "@/APIS/api";
import { candelStickOptions } from "@/constant";
import ApexChart from "./ApexChart";
import WebSocketFunc from "./WebSocketFunc";
import { Circles } from "react-loader-spinner";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 100% of the viewport height */
`;

const OHLCChart = () => {
  const [ohlcData, setOHLCData] = useState([]);

  useEffect(() => {
    const handleWebSocketData = (data) => {
      setTimeout(() => {
        setOHLCData(data);
      }, 2000);
    };
    WebSocketFunc({ onDataReceived: handleWebSocketData });
    const getResponse = async (): Promise<void> => {
      const getData = await fetchApiData();
      const candlestickData = [
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

  return (
    <div>
      {ohlcData?.length > 0 ? (
        <ApexChart options={candelStickOptions} series={ohlcData} />
      ) : (
        <LoaderWrapper>
          <Circles
            height="80"
            width="80"
            color="green"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </LoaderWrapper>
      )}
    </div>
  );
};

export default OHLCChart;