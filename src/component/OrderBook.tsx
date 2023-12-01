"use client";

import { fetchOrderBookData } from "@/APIS/api";
import React, { useEffect, useState } from "react";

const OrderBook = () => {
  const [orderBookData, setOrderBookData] = useState();

  useEffect(() => {
    const getOrderBookData = async () => {
      const response = await fetchOrderBookData();
      setOrderBookData(response);
    };
    getOrderBookData();
  }, []);

  console.log("orderBookData", orderBookData)

  return (

    <div>Order Book</div>
  );
};

export default OrderBook;
