import {
  OrderBookEntry,
  OrderBookTableContract,
} from "@/component/OrderBookComponent/@type";
import { getOrderPrice } from "@/utils/AllUtils";
import React from "react";

const OrderBookTable: React.FC<OrderBookTableContract> = ({
  orderBookData,
  precesion,
}) => {
  const orderRows = (arr: OrderBookEntry[]) =>
    arr &&
    arr.map((item: any) => (
      <>
        {console.log("item", item)}
        <tr key={`book-${item[0]}${item[1]}${item[2]}${item[3]}`}>
          <td> {item[1]} </td>
          <td> {item[2].toFixed(2)} </td>
          <td> {item[3]} </td>
          <td> {getOrderPrice(item[0], precesion)} </td>
        </tr>
      </>
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
      <table className="orderTable">
        {orderHead()}
        <tbody>{orderRows(orderBookData.bids)}</tbody>
      </table>
      <table>
        {orderHead()}
        <tbody>{orderRows(orderBookData.asks)}</tbody>
      </table>
    </>
  );
};

export default OrderBookTable;
