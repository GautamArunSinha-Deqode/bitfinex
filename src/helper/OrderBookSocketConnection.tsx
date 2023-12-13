import { OrderBookConstant } from "@/constant/AllConstant";
import { w3cwebsocket as W3CWebSocket } from "websocket";



const handelOrderBookSocektConnection = (setOrderBookDataCallback: any) => {
  const wsEndpoint = OrderBookConstant.wsEndpointApi;
  const orderBooksSubscription = {
    event: OrderBookConstant.subscription_event,
    channel: OrderBookConstant.subscription_channel,
    freq: OrderBookConstant.subscription_freq,
    len: OrderBookConstant.subscription_len,
    symbol: OrderBookConstant.subscription_symbol,
    prec: OrderBookConstant.subscription_prec,
  };

  const ws = new W3CWebSocket(wsEndpoint);

  ws.onopen = () => {
    ws.send(JSON.stringify(orderBooksSubscription));
  };

  ws.onmessage = (message: any) => {
    const data = JSON.parse(message?.data.toString());

    if (data && Array.isArray(data) && data[1]) {
      const [channelId, orderBookEntries] = data;

      if (
        channelId &&
        orderBookEntries &&
        typeof orderBookEntries === "object"
      ) {
        const isSnapshot = Object.keys(orderBookEntries).length > 4;

        if (isSnapshot) {
          setOrderBookDataCallback({
            asks: orderBookEntries
              .filter((entry: any) => entry[2] > 0)
              .map((entry: any) => [
                parseFloat(entry[0]),
                entry[1],
                entry[1] * parseFloat(entry[0]),
                entry[2],
              ]),
            bids: orderBookEntries
              .filter((entry: any) => entry[2] < 0)
              .map((entry: any) => [
                parseFloat(entry[0]),
                entry[1],
                entry[1] * parseFloat(entry[0]),
                entry[2],
              ]),
          });
        } else {
          // Update
          setOrderBookDataCallback((prevOrderBookData: any) => {
            const updatedAsks: any[] = [...prevOrderBookData.asks];
            const updatedBids: any[] = [...prevOrderBookData.bids];

            Object.keys(orderBookEntries).forEach((price) => {
              if (!isNaN(parseFloat(price))) {
                const entry = orderBookEntries[price];
                const size = entry[0];
                const count = entry[1];
                const updatedEntry = [
                  parseFloat(price),
                  size,
                  size * parseFloat(price),
                  count,
                ];

                if (size > 0) {
                  // Ask
                  const index = updatedAsks.findIndex(
                    (ask) => ask[0] === parseFloat(price)
                  );
                  if (index !== -1) {
                    updatedAsks[index] = updatedEntry;
                  } else {
                    updatedAsks.push(updatedEntry);
                  }
                } else if (size < 0) {
                  // Bid
                  const index = updatedBids.findIndex(
                    (bid) => bid[0] === parseFloat(price)
                  );
                  if (index !== -1) {
                    updatedBids[index] = updatedEntry;
                  } else {
                    updatedBids.push(updatedEntry);
                  }
                }
              }
            });

            // Sort the arrays based on price (you may want to adjust the sorting logic)
            updatedAsks.sort((a, b) => a[0] - b[0]);
            updatedBids.sort((a, b) => b[0] - a[0]);

            return {
              asks: updatedAsks,
              bids: updatedBids,
            };
          });
        }
      }
    }
  };

  // Event handler for errors
  ws.onerror = (error: any) => {
    console.error("WebSocket error:", error);
  };

  // Event handler when the connection is closed
  ws.onclose = (event: any) => {
    console.log("WebSocket closed:", event);
  };
  return ws;
};

export default handelOrderBookSocektConnection;
