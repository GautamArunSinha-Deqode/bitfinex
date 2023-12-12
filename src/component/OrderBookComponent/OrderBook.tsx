"use client";

import React, { useEffect, useRef, useState } from "react";
import { numberWithCommas } from "@/helper/NumberSaprator";
import handelOrderBookSocektConnection from "./OrderBookSocketConnection";

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
const OrderBookCom = () => {
  const [orderBookData, setOrderBookData] = useState<OrderBookData>({
    asks: [],
    bids: [],
  });
  const [connectionValue, setConnectionValue] = useState(true);
  const [precesion, setPrecesion] = useState(false);
  const ws: any = useRef(null);

  useEffect(() => {
    ws.current = handelOrderBookSocektConnection(setOrderBookData);
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [orderBookData]);

  const GetPrice = (data: number) => {
    let value = numberWithCommas(data);
    if (precesion) {
      let numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        value = numericValue.toFixed(2);
      }
    }


    return value;
  };

  const orderRows = (arr: any) =>
    arr &&
    arr.map((item: any) => (
      <tr key={`book-${item[0]}${item[1]}${item[2]}${item[3]}`}>
        <td> {item[1]} </td>
        <td> {item[2].toFixed(2)} </td>
        <td> {item[3]} </td>
        <td> {GetPrice(item[0])} </td>
      </tr>
    ));

  const orderHead = () => (
    <thead>
      <tr>
        <th>Count </th>
        <th>Amount </th>
        <th>Total </th>
        <th>Price </th>
      </tr>
    </thead>
  );

  const handelDisconnect = () => {
    if (ws.current) {
      ws.current.close();
      setConnectionValue(false);
    }
  };

  const handelConnect = () => {
    handelOrderBookSocektConnection(setOrderBookData);
    setConnectionValue(true);
  };

  const handelPrecesion = () => {
    let precesionValue = precesion ? false : true;
    setPrecesion(precesionValue);
  };
  return (
    <div>
      <h2>Order Book </h2>

      <div style={{ display: "flex", gap: "10px" }}>
        {connectionValue ? (
          <>
            <button style={{ marginBottom: "10px" }} onClick={handelDisconnect}>
              {" "}
              Disconnect{" "}
            </button>
          </>
        ) : (
          <>
            <button style={{ marginBottom: "10px" }} onClick={handelConnect}>
              {" "}
              Connect{" "}
            </button>
          </>
        )}
        <button style={{ marginBottom: "10px" }} onClick={handelPrecesion}>
          {" "}
          precesion{" "}
        </button>
      </div>

      <div className="order-container">
        <>
          <table>
            {orderHead()}
            <tbody>{orderRows(orderBookData.bids)}</tbody>
          </table>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <table>
            {orderHead()}
            <tbody>{orderRows(orderBookData.asks)}</tbody>
          </table>
        </>
      </div>
    </div>
  );
};

export default OrderBookCom;
// Price: entry[0]
// Count: entry[1]
// Amount: entry[2]
// Total: entry[3]
