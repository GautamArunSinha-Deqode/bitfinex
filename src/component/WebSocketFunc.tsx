"use client";

// import React, { useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// import { OHLCData } from "@/APIS/api";

interface WebSocketFuncContract {
  onDataReceived: (data: Object) => void;
}

const WebSocketFunc: React.FC<WebSocketFuncContract> = ({ onDataReceived }) => {
  const socket = new W3CWebSocket("ws://localhost:3001");
  const handleWebSocketData = (event: any) => {
    const { newData } = JSON.parse(event.data);
    console.log("newDataPoint", newData);

    const candlestickSocketData = [
      {
        name: "candlesticks",
        data: newData?.map((dataPoint: any) => ({
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