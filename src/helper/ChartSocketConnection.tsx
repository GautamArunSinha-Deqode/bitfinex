
import { setOHLCDataContract } from "@/component/ChartComponent/@type";
import { ChartConstant } from "@/constant/AllConstant";
import { w3cwebsocket as W3CWebSocket } from "websocket";


const handleSocketConnection = (setOHLCData:setOHLCDataContract[]) => {
  const wsEndpoint = ChartConstant.wsEndpointApi;
  const OHLCSubscription = {
    event: ChartConstant.subscription_event,
    channel: ChartConstant.subscription_channel,
    key: ChartConstant.subscription_key,
  };

  const ws = new W3CWebSocket(wsEndpoint);

  ws.onopen = () => {
    ws.send(JSON.stringify(OHLCSubscription));
  };

  ws.onmessage = (message) => {
    const data = JSON.parse(message?.data.toString());
    if (data && Array.isArray(data) && data[1]) {
      const [, OHLCEntries] = data;
      if (OHLCEntries?.length > 0 && Array.isArray(OHLCEntries)) {
        const ohlcData = OHLCEntries?.map((dataPoint) => ({
          timestamp: dataPoint[0],
          open: dataPoint[1],
          high: dataPoint[3],
          low: dataPoint[4],
          close: dataPoint[2],
          volume: dataPoint[5],
        }));

        const candlestickData = [
          {
            name: ChartConstant.candlestick_name,
            data: ohlcData?.map((dataPoint) => ({
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

  ws.onerror = (error: Error) => {
    console.error("WebSocket error:", error);
  };
  ws.onclose = (event : CloseEventInit) => {
    console.log("WebSocket closed:", event);
  };
  return ws;
};

export default handleSocketConnection;
