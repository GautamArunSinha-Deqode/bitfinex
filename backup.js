"use client";

import { fetchOrderBookData } from "@/APIS/api";
import React, { useEffect, useState } from "react";
import { OrderBook } from "@lab49/react-order-book";


const OrderBookTable = ({ bidOrders, askOrders }) => {
  return (
    <div>
      <h3>Bid Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {bidOrders?.map((order, index) => (
            <tr key={index}>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Ask Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {askOrders?.map((order, index) => (
            <tr key={index}>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const OrderBookCom = () => {
  const [orderBookData, setOrderBookData] = useState();
  const [bidOrders , setBidOrders] = useState([]);
  const [askOrders , setAskOrders] = useState([]);


  useEffect(() => {
    const getOrderBookData = async () => {
      const response = await fetchOrderBookData();
      setOrderBookData(response);
    };
    getOrderBookData();

    const intervalId = setInterval(() => {
      getOrderBookData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (orderBookData?.length > 0) {
      const bidOrdersTemp = [];
      const askOrdersTemp = [];

      orderBookData?.forEach((orderData) => {
        const [price, quantity, count, total] = orderData;
        const order = { price, quantity, total , count};
        console.log("order-------order", order)
        if (count === 1) {
          bidOrdersTemp.push(order);
        } else if (count === -1) {
          askOrdersTemp.push(order);
        }
      });

      setBidOrders(bidOrdersTemp);
      setAskOrders(askOrdersTemp);
    }
  }, [orderBookData]);

  console.log("orderBookData", orderBookData);
  console.log("bidOrders", bidOrders);
  // Amount: Amount = Price * Quantity
  // Total: Total = -Total (since the provided data is negative)
  // Average Price: Average Price = Total / Quantity
  const orderRows = (arr) =>
    arr &&
    arr.map((item, index) => (
      <tr key={index}>
        <td> {item['count']} </td>
        <td> {item['price'] * item['quantity']} </td>
        <td> {item['total']} </td>
        <td> {item['total']/item['quantity']} </td>
      </tr>
    ));
  const orderHead = (title) => (
    <thead>
      <tr>
        <th colSpan="2">{title}</th>
      </tr>
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
  {/* //   <h2>Order Book</h2>
  //   <OrderBookTable bidOrders={bidOrders} askOrders={askOrders} /> */}
  
  <h2>Order Book </h2>  

  <div className="order-container">
 
      {bidOrders?.length > 0  ? (
     <>
          <table>
          {orderHead('Bids')}
          <tbody>{orderRows(bidOrders)}</tbody>
        </table>
      
        <table>
        {orderHead('Asks')}
          <tbody>{orderRows(askOrders)}</tbody>
        </table>
     </>
      ) : ""}

</div>
</div>
  );
};




export default OrderBookCom;
