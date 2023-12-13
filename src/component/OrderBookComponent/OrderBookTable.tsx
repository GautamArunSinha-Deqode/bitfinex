import { getOrderPrice } from "@/utils/AllUtils";
import React, { useState } from "react";
import {OrderBookTableContract} from "@/component/OrderBookComponent/@type"




const OrderBookTable: React.FC<OrderBookTableContract> = ({orderBookData}) => {
  const [precesion, setPrecesion] = useState(false);

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
  );
};

export default OrderBookTable;
