"use client";

import React, { useState } from "react";
import OrderBookTable from "./OrderBookTable";
import "./style.css";
import useSocketConnectionOrderBook from "./useSocketConnectionOrderBook";

const OrderBookCom = () => {
  const [precesion, setPrecesion] = useState(false);
  const { orderBookData, connectionValue, handelDisconnect, handelConnect } =
    useSocketConnectionOrderBook();
  const handelPrecesion = () => {
    setPrecesion((prevPrecision) => !prevPrecision);
  };

  return (
    <div>
      <h2>Order Book </h2>

      <div className="flexContainer">
        {connectionValue ? (
          <button className="buttonContainer" onClick={handelDisconnect}>
            Disconnect
          </button>
        ) : (
          <button className="buttonContainer" onClick={handelConnect}>
            Connect
          </button>
        )}
        <button className="buttonContainer" onClick={handelPrecesion}>
          Precesion
        </button>
      </div>

      <div className="orderTableContainer">
        <>
          <OrderBookTable orderBookData={orderBookData} precesion={precesion} />
        </>
      </div>
    </div>
  );
};
export default OrderBookCom;
