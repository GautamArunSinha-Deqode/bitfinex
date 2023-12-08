"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchApiData } from "@/APIS/api";
import ApexChart from "./ApexChart";
import WebSocketFunc from "./WebSocketFunc";
import { candelStickOptions } from "@/constant/CandelStickConstant";
import Loader from "./Loader";
import { w3cwebsocket as W3CWebSocket } from "websocket";
const OHLCChart = () => {
  const [ohlcData, setOHLCData] = useState<any[]>([]);
  const ws: any = useRef(null);
  // useEffect(() => {
  //   const handleWebSocketData = (data: any) => {
  //     setTimeout(() => {
  //       setOHLCData(data);
  //     }, 2000);
  //   };
  //   WebSocketFunc({ onDataReceived: handleWebSocketData });
  //   const getResponse = async (): Promise<void> => {
  //     const getData = await fetchApiData();
  //     const candlestickData: any = [
  //       {
  //         name: "candlesticks",
  //         data: getData?.map((dataPoint) => ({
  //           x: dataPoint.timestamp,
  //           y: [dataPoint.open, dataPoint.high, dataPoint.low, dataPoint.close],
  //         })),
  //       },
  //     ];
  //     setTimeout(() => {
  //       setOHLCData(candlestickData);
  //     }, 2000);
  //   };
  //   getResponse();
  // }, []);

  useEffect(() => {
    //     setTimeout(() => {
    //       setOHLCData(candlestickData);
    //     }, 2000);
    handelSocektConnection();
    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [ohlcData]);
  const handelSocektConnection = () => {
    const wsEndpoint = "wss://api-pub.bitfinex.com/ws/2";
    const OHLCSubscription = {
      event: "subscribe",
      channel: "candles",
      key: `trade:15m:tBTCUSD`,
    };

    ws.current = new W3CWebSocket(wsEndpoint);

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify(OHLCSubscription));
    };

    ws.current.onmessage = (message: any) => {
      const data = JSON.parse(message?.data.toString());

      if (data && Array.isArray(data) && data[1]) {
        const [, OHLCEntries] = data;
        if (OHLCEntries?.length > 0 && Array.isArray(OHLCEntries)) {
          const ohlcData = OHLCEntries?.map((dataPoint: any) => ({
            timestamp: dataPoint[0],
            open: dataPoint[1],
            high: dataPoint[3],
            low: dataPoint[4],
            close: dataPoint[2],
            volume: dataPoint[5],
          }));

          const candlestickData: any = [
            {
              name: "candlesticks",
              data: ohlcData?.map((dataPoint: any) => ({
                x: dataPoint.timestamp,
                y: [
                  dataPoint.open,
                  dataPoint.high,
                  dataPoint.low,
                  dataPoint.close,
                ],
              })),
            },
          ];
          setOHLCData(candlestickData);
        }
      }
    };

    ws.current.onerror = (error: any) => {
      console.error("WebSocket error:", error);
    };
    ws.current.onclose = (event: any) => {
      console.log("WebSocket closed:", event);
    };
  };

  const handleClick = () => {
    window.location.href = "/OrderBookPage";
  };
  // console.log("ohlcData  ohlcData", ohlcData[0].data[0].x);
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
