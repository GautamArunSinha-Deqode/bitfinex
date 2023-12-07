"use client";

// import { fetchOrderBookData } from "@/APIS/api";
import React, { useEffect, useState } from "react";
// import { OrderBook } from "@lab49/react-order-book";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {numberWithCommas} from "../helper/NumberSaprator"


const OrderBookCom = () => {
  interface OrderBookData {
    asks: OrderBookEntry[];
    bids: OrderBookEntry[];
  }

  interface OrderBookEntry {
    price: number;
    quantity: number;
    total: number;
    count: number;
  }

  const [orderBookData, setOrderBookData] = useState<OrderBookData>({
    asks: [],
    bids: [],
  });

  useEffect(() => {
    // Bitfinex WebSocket API endpoint
    const wsEndpoint = "wss://api.bitfinex.com/ws/2";

    // Define the payload to subscribe to the Order Books channel
    const orderBooksSubscription = {
      event: "subscribe",
      channel: "book",
      freq: "F1",
      len: "25",
      symbol: "BTCUSD",
      prec: "P0", // Precision, you may need to adjust this based on your requirements
    };

    // Create a WebSocket connection
    const ws = new W3CWebSocket(wsEndpoint);

    // Event handler when the connection is open
    ws.onopen = () => {
      // Subscribe to the Order Books channel
      ws.send(JSON.stringify(orderBooksSubscription));
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message?.data.toString());
      console.log("datatypeof", data);

      if (data && Array.isArray(data) && data[1]) {
        const [channelId, orderBookEntries] = data;

        if (
          channelId &&
          orderBookEntries &&
          typeof orderBookEntries === "object"
        ) {
          const isSnapshot = Object.keys(orderBookEntries).length > 4;

          if (isSnapshot) {
            // Snapshot
            setOrderBookData({
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
            setOrderBookData((prevOrderBookData) => {
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
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Event handler when the connection is closed
    ws.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, [orderBookData]);

  const orderRows = (arr: any) =>
    arr &&
    arr.map((item: any, index: number) => (
      <tr>
        <td> {item[1]} </td>
        <td> {item[2].toFixed(2)} </td>
        <td> {item[3]} </td>
        <td> {numberWithCommas(item[0])} </td>
      </tr>
    ));

    // Price: entry[0]
    // Count: entry[1]
    // Amount: entry[2]
    // Total: entry[3]
  const orderHead = (title: string) => (
    <thead>
      <tr>
        {/* <th>{title}</th> */}
      </tr>
      <tr>
        {/* <th>Price </th>
        <th>Size </th>
        <th>Total </th>
        <th>Count </th> */}

        <th>Count </th>
        <th>Amount </th>
        <th>Total </th>
        <th>Price </th>
      </tr>
    </thead>
  );

  return (
    <div>
      <h2>Order Book </h2>

      <div className="order-container">
        <>
          <table>
            {orderHead("Bids")}
            <tbody>{orderRows(orderBookData.bids)}</tbody>
          </table>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <table>
            {orderHead("Asks")}
            <tbody>
              
              {orderRows(orderBookData.asks)}</tbody>
          </table>
        </>
      </div>
    </div>
  );
};

export default OrderBookCom;
