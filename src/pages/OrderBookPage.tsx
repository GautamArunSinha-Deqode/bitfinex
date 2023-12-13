import OrderBookCom from "@/component/OrderBookComponent/OrderBook";
import Head from "next/head";
import React from "react";
import "../app/globals.css";

const OrderBookPage = () => {
  return (
    <main>
      <Head>
        <title>Order Book</title>
      </Head>
      <OrderBookCom />
    </main>
  );
};

export default OrderBookPage;
