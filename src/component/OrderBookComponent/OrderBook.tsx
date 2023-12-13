"use client";

import { getOrderPrice } from "@/utils/AllUtils";
import React, { useState } from "react";
import useSocketConnectionOrderBook from "./useSocketConnectionOrderBook";
import OrderBookTable from "./OrderBookTable";

const OrderBookCom = () => {
  const [precesion, setPrecesion] = useState(false);
  const { orderBookData, connectionValue, handelDisconnect, handelConnect } =
    useSocketConnectionOrderBook();
  const handelPrecesion = () => {
    setPrecesion((prevPrecision) => !prevPrecision);
  };
  const orderRows = (arr: any) =>
    arr &&
    arr.map((item: any) => (
      <tr key={`book-${item[0]}${item[1]}${item[2]}${item[3]}`}>
        <td> {item[1]} </td>
        <td> {item[2].toFixed(2)} </td>
        <td> {item[3]} </td>
        <td> {getOrderPrice(item[0], precesion)} </td>
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

  return (
    <div>
      <h2>Order Book </h2>

      <div style={{ display: "flex", gap: "10px" }}>
        {connectionValue ? (
          <>
            <button style={{ marginBottom: "10px" }} onClick={handelDisconnect}>
              Disconnect
            </button>
          </>
        ) : (
          <>
            <button style={{ marginBottom: "10px" }} onClick={handelConnect}>
              Connect
            </button>
          </>
        )}
        <button style={{ marginBottom: "10px" }} onClick={handelPrecesion}>
          precesion
        </button>
      </div>

      <div className="order-container">
        <>
      <OrderBookTable orderBookData={orderBookData} />
        </>
      </div>
    </div>
  );
};
export default OrderBookCom;
