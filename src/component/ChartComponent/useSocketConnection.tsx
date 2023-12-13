import { useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import handleSocketConnection from "../../helper/ChartSocketConnection";
const useSocketConnection = () => {
  const [ohlcData, setOHLCData] = useState<any[]>([]);
  const ws = useRef<W3CWebSocket | null>(null);
  useEffect(() => {
    ws.current = handleSocketConnection(setOHLCData);
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [ohlcData]);
  return {
    ohlcData,
  };
};

export default useSocketConnection;
