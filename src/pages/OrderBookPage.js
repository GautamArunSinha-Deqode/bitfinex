// import OrderBookCom from "@/component/OrderBook";
import OrderBookCom from "@/component/OrderBookComponent/OrderBook";
import React from "react";
import "../app/globals.css";
import Head from "next/head";

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
