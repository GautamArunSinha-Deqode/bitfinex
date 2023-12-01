"use client";

import React, { useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { OHLCData } from "@/APIS/api";

const WebSocketFunc = ({ onDataReceived }) => {
  const socket = new W3CWebSocket("ws://localhost:3001");
  const handleWebSocketData = (event: MessageEvent) => {
    const newDataPoint: OHLCData = JSON.parse(event.data);
    console.log("newDataPoint", newDataPoint);

    const candlestickSocketData = [
      {
        name: "candlesticks",
        data: newDataPoint?.map((dataPoint) => ({
          x: dataPoint.timestamp,
          y: [dataPoint.open, dataPoint.high, dataPoint.low, dataPoint.close],
        })),
      },
    ];
    onDataReceived(candlestickSocketData);
  };

  socket.onmessage = handleWebSocketData;

  return <div>WebSocketFunc component</div>;
};
export default WebSocketFunc;

// setOHLCData((prev) => [...candlestickSocketData, ...prev]);
//   setOHLCData(candlestickSocketData);
// setOHLCData(candlestickSocketData);
